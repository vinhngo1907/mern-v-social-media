import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

// import Info from './Info'
// import Saved from './Saved'
// import Posts from './Posts'
import LeftSideBar from './global/LeftSideBar'

import { fetchStatistics } from '../redux/statisticSlice'
import { getProfileUsers } from '../redux/profileSlice'

const Profile = () => {
  const { auth, profile, socket, statistic } = useSelector(state => state)
  const dispatch = useDispatch()
  const { id } = useParams()

  const [saveTab, setSaveTab] = useState(false)

  // Load profile + posts
  useEffect(() => {
    if (id && profile.ids.every(i => i !== id)) {
      dispatch(getProfileUsers({ id, auth }))
    }
  }, [id, profile.ids, dispatch, auth])

  // Statistics / page view logic
  useEffect(() => {
    if (!id) return

    const fromSS = sessionStorage.getItem('visit')

    const timer = setTimeout(() => {
      dispatch(
        fetchStatistics({
          id,
          type: fromSS ? '' : 'visit-pageview',
          auth,
          socket,
        })
      )

      if (!fromSS) {
        sessionStorage.setItem('visit', 'x')
      }
    }, 10000)

    return () => clearTimeout(timer)
  }, [dispatch, auth, id, socket])

  return (
    <div className="profile row mx-0">
      <div className="left_sidebar col-md-3">
        <LeftSideBar type="profile" />
      </div>

      <div className="main_sidebar col-md-9">
        {/* <Info
          auth={auth}
          profile={profile}
          dispatch={dispatch}
          id={id}
          socket={socket}
          statistic={statistic}
        /> */}

        {auth.user?._id === id && (
          <div className="profile_tab">
            <button
              className={!saveTab ? 'active' : ''}
              onClick={() => setSaveTab(false)}
            >
              Posts
            </button>
            <button
              className={saveTab ? 'active' : ''}
              onClick={() => setSaveTab(true)}
            >
              Saved
            </button>
          </div>
        )}

        {profile.loading ? (
          <div
            className="spinner-border text-primary d-block mx-auto"
            role="status"
          >
            <span className="sr-only">Loading...</span>
          </div>
        ) : (
          <>
            {/* {saveTab ? (
              <Saved auth={auth} dispatch={dispatch} />
            ) : (
              <Posts
                auth={auth}
                profile={profile}
                dispatch={dispatch}
                id={id}
              />
            )} */}
          </>
        )}
      </div>
    </div>
  )
}

export default Profile
