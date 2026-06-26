const { groupModel } = require("../../db/models");

const changeSlug = (characters) => {
	let slug = characters.toLowerCase();

	//Đổi ký tự có dấu thành không dấu
	slug = slug.replace(/á|à|ả|ạ|ã|ă|ắ|ằ|ẳ|ẵ|ặ|â|ấ|ầ|ẩ|ẫ|ậ/gi, "a");
	slug = slug.replace(/é|è|ẻ|ẽ|ẹ|ê|ế|ề|ể|ễ|ệ/gi, "e");
	slug = slug.replace(/i|í|ì|ỉ|ĩ|ị/gi, "i");
	slug = slug.replace(/ó|ò|ỏ|õ|ọ|ô|ố|ồ|ổ|ỗ|ộ|ơ|ớ|ờ|ở|ỡ|ợ/gi, "o");
	slug = slug.replace(/ú|ù|ủ|ũ|ụ|ư|ứ|ừ|ử|ữ|ự/gi, "u");
	slug = slug.replace(/ý|ỳ|ỷ|ỹ|ỵ/gi, "y");
	slug = slug.replace(/đ/gi, "d");
	//Xóa các ký tự đặt biệt
	slug = slug.replace(
		/\`|\~|\!|\@|\#|\||\$|\%|\^|\&|\*|\(|\)|\+|\=|\,|\.|\/|\?|\>|\<|\'|\"|\:|\;|_/gi,
		""
	);
	//Đổi khoảng trắng thành ký tự gạch ngang
	slug = slug.replace(/ /gi, "-");
	//Đổi nhiều ký tự gạch ngang liên tiếp thành 1 ký tự gạch ngang
	//Phòng trường hợp người nhập vào quá nhiều ký tự trắng
	slug = slug.replace(/\-\-\-\-\-/gi, "-");
	slug = slug.replace(/\-\-\-\-/gi, "-");
	slug = slug.replace(/\-\-\-/gi, "-");
	slug = slug.replace(/\-\-/gi, "-");
	//Xóa các ký tự gạch ngang ở đầu và cuối
	slug = "@" + slug + "@";
	slug = slug.replace(/\@\-|\-\@|\@/gi, "");
	//Xoá space giửa các kí tự
	slug = slug.replace(/\s/g, "");

	return slug;
};

function generateSlug(text) {
	return text
		.toString()
		.toLowerCase()
		.trim()
		.normalize('NFD')
		.replace(/[\u0300-\u036f]/g, '')
		.replace(/[^a-z0-9\s-]/g, '')
		.replace(/\s+/g, '-')
		.replace(/-+/g, '-');
}

// utils/generateInviteCode.js

/**
 * Generate a unique invite code for group public link
 * Format: 8-10 characters, uppercase + numbers (easy to read and type)
 */
const generateInviteCode = async () => {
	const characters = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
	const codeLength = 8;

	let attempts = 0;
	const maxAttempts = 10;

	while (attempts < maxAttempts) {
		let code = '';
		for (let i = 0; i < codeLength; i++) {
			code += characters.charAt(Math.floor(Math.random() * characters.length));
		}

		const existing = await groupModel.findOne({ 'publicLink.code': code });
		if (!existing) {
			return code;
		}
		attempts++;
	}

	throw new Error('Failed to generate unique invite code');
};

module.exports = {
	changeSlug,
	generateSlug,
	generateInviteCode
}