const api = {
  getEduOrgInfo: {
    url: '/zhktManage/getEduOrgInfo',
    methods: 'post'
  },
  getStatisticsTatol: {
    url: '/zhktManage/getStatisticsTatol',
    methods: 'post'
  },
  getStudentlearningNum: {
    url: '/zhktManage/getStudentlearningNum',
    methods: 'post'
  },
  getStudentInteractionNum: {
    url: '/zhktManage/getStudentInteractionNum',
    methods: 'post'
  }
}
// {
//   getEduOrgInfo: (`/${base}/zhktManage/getEduOrgInfo`), // 根据登陆账号获取所在机构的信息getSchoolCovList: (`/${base}/zhktManage/getMapDetail`), // 覆盖学校地图详情
//   getStatisticsTatol: (`/${base}/zhktManage/getStatisticsTatol`), // 数字板（覆盖学校，用户活跃度）
//   getStudentlearningNum: (`/${base}/zhktManage/getStudentlearningNum`), // 返回学生学习行为的次数统计
//   getStudentInteractionNum: (`/${base}/zhktManage/getStudentInteractionNum`), // 学生互动类型统计（雷达图）
//   getTeachingResTotal: (`/${base}/zhktManage/getTeachingResTotal`), // 教学资源总数统计
//   getResTypeNum: (`/${base}/zhktManage/getResTypeNum`), // 教学资源类型统计（分布环图）
//   getTeachersTeachingTime: (`/${base}/zhktManage/getTeachersTeachingTime`), // 教师授课时长饼图（授课时长区间人数）
//   getTeachersTeachingNum: (`/${base}/zhktManage/getTeachersTeachingNum`), // 教师授课行为（授课各个行为统计）
// }
export default api
