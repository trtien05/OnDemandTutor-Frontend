export enum PageEnum {
    LOGIN = 'Login',
    REGISTER = 'Register',
    FORGOT_PASSWORD = 'ForgotPassword',
    SET_PASSWORD = 'SetPassword',
    VERIFY_EMAIL = 'VerifyCode',
}

export enum Degree {
    ASSOCIATE = 'Associate',
    BACHELOR = 'Bachelor',
    MASTER = 'Master',
    DOCTORAL = 'Doctoral',
}

export enum Subject {
    MATH = 'Math',
    CHEMISTRY = 'Chemistry',
    BIOLOGY = 'Biology',
    PHYSICS = 'Physics',
    GEOGRAPHY = 'Geography',

    LITERATURE = 'Literature',
    ENGLISH = 'English',

    IELTS = 'IELTS',
    TOEIC = 'TOEIC',
    TOEFL = 'TOEFL',

    CODING = 'Coding',

    HISTORY = 'History',

    OTHER = 'Other',
}


export const AccountStatus: { [key: string]: string } = {
    ACTIVE : 'ACTIVE',
    INACTIVE : 'UNVERIFIED',
    PROCESSING : 'PROCESSING',
    BANNED : 'BANNED',
}

export const Role: { [key: string]: string } = {
    STUDENT: 'STUDENT',
    TUTOR: 'TUTOR',
    MODERATOR: 'MODERATOR',
    ADMIN: 'ADMIN',
};

export enum Category {
    SINGLE_SERVICE = 'Single',
    SINGLE_SERVICE_UPPER = 'SINGLE',
    PACKAGE_SERVICE = 'Package',
    PACKAGE_SERVICE_UPPER = 'PACKAGE',
    ALL = '',
}

export enum LinkEnum {
    LINK = 'Link',
    NAV_LINK = 'NavLink',
}

export enum UnitOfMeasure {
    HOUR = 'HOUR',
    KG = 'KG',
    TIMES = 'TIMES',
    ITEM = 'ITEM',
    COMBO = 'COMBO',
}

export enum Status {
    INCOMING = 'INCOMING',
    DONE = 'DONE',
    CANCEL = 'CANCEL',
    PROCESSING = 'PROCESSING',
    PENDING = 'PENDING',
}

export enum StatusLabel {
    INCOMING = 'Sắp đến',
    DONE = 'Đã hoàn thành',
    CANCEL = 'Đã hủy',
    PROCESSING = 'Đang xử lý',
    PENDING = 'Chờ thực hiện',
}

export enum ModalEnum {
    CREATE = 'Create',
    VIEW = 'View',
}

export enum CycleEnum {
    ONLY_ONE_TIME = 'ONLY_ONE_TIME',
    EVERY_WEEK = 'EVERY_WEEK',
    EVERY_MONTH = 'EVERY_MONTH',
}

export enum StaffLabelHeader {
    PROFILE = 'Hồ sơ',
    JOB = 'Tìm việc',
    JOB_DETAIL = 'Chi tiết công việc',
    TASK = 'Danh sách công việc',
    TASK_DETAIL = 'Chi tiết công việc',
}

export enum GroupType {
    HOURLY_SERVICE = 'HOURLY_SERVICE',
    RETURN_SERVICE = 'RETURN_SERVICE',
    DELIVERY_SERVICE = 'DELIVERY_SERVICE',
    OTHER = 'OTHER',
}

export enum Rating {
    ZERO = 0,
    ONE = 1,
    TWO = 2,
    THREE = 3,
    FOUR = 4,
    FIVE = 5,
}

export enum SortBy {
    NONE = '',
    NAME = 'NAME',
    PRICE = 'PRICE',
    NUMBER_OF_SOLD = 'NUMBER_OF_SOLD',
}

export enum OrderBy {
    NONE = '',
    ASC = 'ASC',
    DESC = 'DESC',
}

export enum ServiceCategory {
    HOURLY_SERVICE = 'HOURLY_SERVICE',
    RETURN_SERVICE = 'RETURN_SERVICE',
    DELIVERY_SERVICE = 'DELIVERY_SERVICE',
}

export enum PeriodEnum {
    '3_MONTH' = '3_MONTH',
    '6_MONTH' = '6_MONTH',
    '9_MONTH' = '9_MONTH',
    '12_MONTH' = '12_MONTH',
}

export enum CategoryLabel {
    SINGLE = 'Dịch vụ đơn lẻ',
    PACKAGE = 'Gói dịch vụ',
}

export enum SaleStatusLabel {
    AVAILABLE = 'Đang kinh doanh',
    ONSALE = 'Đang giảm giá',
    DISCONTINUED = 'Ngừng kinh doanh',
}

export enum ImageEnum {
    AVATAR = 'AVATAR',
    SERVICE = 'SERVICE',
    WORKING = 'WORKING',
}

export enum PaymentMethod {
    VNPAY = 'VNPAY',
    MOMO = 'MOMO',
}

export enum StaffStatusLabel {
    ACTIVE = 'Đang làm việc',
    INACTIVE = 'Đã nghỉ việc',
    BANNED = 'Đã bị cấm',
}

export enum TaskStatus {
    PENDING_APPLICATION = 'PENDING_APPLICATION', //waiting for staff apply apply for job
    PENDING_WORKING = 'PENDING_WORKING', //found staff - waiting for staff coming
    INCOMING = 'INCOMING', //staff coming in around 4 5 6 12 hour
    CANCELLED_CAUSE_NOT_FOUND_STAFF = 'CANCELLED_CAUSE_NOT_FOUND_STAFF',
    CANCELLED_BY_STAFF = 'CANCELLED_BY_STAFF',
    CANCELLED_BY_CUSTOMER = 'CANCELLED_BY_CUSTOMER',
    ARRIVED = 'ARRIVED', //staff arrived - start doing
    DOING = 'DOING',
    DONE = 'DONE',
    CANCELLED = 'CANCELLED',
}

export enum TaskStatusLabel {
    PENDING_APPLICATION = 'Đang tìm kiếm', //waiting for staff apply apply for job
    PENDING_WORKING = 'Chờ thực hiện', //found staff - waiting for staff coming
    INCOMING = 'Sắp đến', //staff coming in around 4 5 6 12 hour
    CANCELLED_CAUSE_NOT_FOUND_STAFF = 'Đã hủy do không tìm thấy nhân viên',
    CANCELLED_BY_STAFF = 'Đã hủy bởi nhân viên',
    CANCELLED_BY_CUSTOMER = 'Đã hủy bởi khách hàng',
    ARRIVED = 'Đã đến', //staff arrived - start doing
    DOING = 'Đang làm việc',
    DONE = 'Đã hoàn thành',
    CANCELLED = 'Đã hủy',
}

export enum Config {
    SERVICE_GROUPS = 'SERVICE_GROUPS',
    SERVICE_UNITS = 'SERVICE_UNITS',
    OFFICE_HOURS_START = 'OFFICE_HOURS_START',
    OFFICE_HOURS_END = 'OFFICE_HOURS_END',
    FIND_STAFF_MINUTES = 'FIND_STAFF_MINUTES',
    MINIMUM_RETURN_MINUTES = 'MINIMUM_RETURN_MINUTES',
    DURATION_HOURS_CUSTOMER_SHOULD_NOT_CANCEL_TASK = 'DURATION_HOURS_CUSTOMER_SHOULD_NOT_CANCEL_TASK',
    DURATION_HOURS_STAFF_SHOULD_NOT_CANCEL_TASK = 'DURATION_HOURS_STAFF_SHOULD_NOT_CANCEL_TASK',
    DURATION_HOURS_ALLOW_BAD_STAFF_PROFICENT_SCORE_APPLY = 'DURATION_HOURS_ALLOW_BAD_STAFF_PROFICENT_SCORE_APPLY',
    DURATION_MINUTES_TIMES_STAFF_START_REPORT = 'DURATION_MINUTES_TIMES_STAFF_START_REPORT',
    MINUS_POINTS_FOR_CUSTOMER_CANCEL_TASK = 'MINUS_POINTS_FOR_CUSTOMER_CANCEL_TASK',
    MINUS_POINTS_FOR_STAFF_CANCEL_TASK = 'MINUS_POINTS_FOR_STAFF_CANCEL_TASK',
    BAD_STAFF_PROFICIENT_SCORE = 'BAD_STAFF_PROFICIENT_SCORE',
    MINUS_POINTS_FOR_NOT_COMPLETE_REPORT_TASK = 'MINUS_POINTS_FOR_NOT_COMPLETE_REPORT_TASK',
    DURATION_HOURS_SYST_AUTO_DONE_TASK = 'DURATION_HOURS_SYST_AUTO_DONE_TASK',
    DURATION_HOURS_SEND_INCOMING_NOTI_BEFORE = 'DURATION_HOURS_SEND_INCOMING_NOTI_BEFORE',
    PLUS_SCORE_PER_SUCCESS_TASK = 'PLUS_SCORE_PER_SUCCESS_TASK',
}

export enum ConfigLabel {
    SERVICE_GROUPS = 'Nhóm dịch vụ',
    SERVICE_UNITS = 'Đơn vị dịch vụ',
    OFFICE_HOURS_START = 'Bắt đầu giờ hành chính',
    OFFICE_HOURS_END = 'Kết thúc giờ hành chính ',
    FIND_STAFF_MINUTES = 'Thời gian tìm kiếm nhân viên (phút)',
    MINIMUM_RETURN_MINUTES = 'Thời gian tối thiểu nhận và trả hàng (phút)',
    DURATION_HOURS_CUSTOMER_SHOULD_NOT_CANCEL_TASK = 'Khoảng thời gian khách hàng không được hủy lịch (giờ)',
    DURATION_HOURS_STAFF_SHOULD_NOT_CANCEL_TASK = 'Khoảng thời gian nhân viên không được hủy việc (giờ)',
    DURATION_HOURS_ALLOW_BAD_STAFF_PROFICENT_SCORE_APPLY = 'Khoảng thời gian nhân viên điểm tin cậy thấp được nhận việc',
    DURATION_MINUTES_TIMES_STAFF_START_REPORT = 'Khoảng thời gian nhân viên bắt đầu báo cáo công việc (phút)',
    MINUS_POINTS_FOR_CUSTOMER_CANCEL_TASK = 'Điểm trừ khách hàng khi hủy lịch',
    MINUS_POINTS_FOR_STAFF_CANCEL_TASK = 'Điểm trừ nhân viên khi hủy việc',
    BAD_STAFF_PROFICIENT_SCORE = 'Thang điểm tin cậy thấp',
    MINUS_POINTS_FOR_NOT_COMPLETE_REPORT_TASK = 'Điểm trừ khi không hoàn thành báo cáo công việc cho nhân viên',
    DURATION_HOURS_SYST_AUTO_DONE_TASK = 'Thời gian hệ thống tự động chuyển trạng thái hoàn thành công việc',
    DURATION_HOURS_SEND_INCOMING_NOTI_BEFORE = 'Thời gian gửi thông báo đang tới',
    PLUS_SCORE_PER_SUCCESS_TASK = 'Điểm cộng mỗi công việc thành công',
}

export enum RoleLabel {
    ADMIN = 'Quản trị viên',
    STAFF = 'Nhân viên',
    CUSTOMER = 'Khách hàng',
    UNKNOWN = 'Không xác định',
}

export enum CancelOption {
    THIS_SCHEDULE = 'THIS_SCHEDULE',
    THIS_AND_FOLLOWING_SCHEDULE = 'THIS_AND_FOLLOWING_SCHEDULE',
}

export enum Gender {
    MALE = 0,
    FEMALE = 1,
    
}
export enum AppointmentStatus {
    PENDING_PAYMENT= 'PENDING_PAYMENT',
    PAID = 'PAID',
    FAILED = 'FAILED',
    CANCELED = 'CANCELED',
    REFUNDED = 'REFUNDED',
    DONE = 'DONE',
}
export enum QuestionStatus {
    UNSOLVED = 'UNSOLVED',
    SOLVED = 'SOLVED',
    PROCESSING = 'PROCESSING',
    REJECTED = 'REJECTED'
    // Add more statuses as needed
}