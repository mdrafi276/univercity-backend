import config from "../config"
import { USER_ROLE } from "../modules/user/user.constant"
import { User } from "../modules/user/user.model"

const supperUser = {
    id: '00001',
    email: 'rafi@gmail.com',
    password: config.supper_admin_password,
    needsPasswordChange: false,
    role: USER_ROLE.supperAdmin,
    status: 'in-progress',
    isDeleted: false,
}
const seeSupperAdmin = () => {
    const isSupperAdminExits = await User.findOne([role: USER_ROLE.supperAdmin])
    if (!isSupperAdminExits) {
        await User.create(supperUser)
    }

}

export default seeSupperAdmin