let vm = new Vue({
  el: '#app',
  data() {
    return {
      myLists: [],
      dataStatus: ['全部', '未完成', '已完成'],
      dataStatusIndex: 0,
      whichShow: true,
      defaultShow: true,
    }
  },
  computed: {
    times() {
      //使用计算属性计算待办renws的次数
      let renwArr = this.myLists
      let times = 0
      for (let i = 0; i < renwArr.length; i++) {
        if (renwArr[i].isChecked === false) {
          times++
        }
      }
      return times
    },
  },
  methods: {
    toEdit(obj) {
      obj.isEditing = true
    },
    unEdit(obj) {
      obj.isEditing = false
    },
    addrenw(e) {
      //添加renw
      var val = e.value
      if (val === '') {
        return
      } //如果输入内容为空则立即返回
      this.myLists = this.myLists.concat({
        //使用concat这个api添加renw
        value: val, //输入内容
        isEditing: false, //是否在编辑状态
        isActive: false, //删除X图标是否激活
        isChecked: false, //是否已完成
      })
      this.$refs.currentInput.value = '' //按下enter添加renw之后把输入框value清零
      window.localStorage.setItem('content', JSON.stringify(this.myLists)) //使用localStorage以JSON格式存储数据
    },
    deleterenw(index) {
      //删除renw
      this.myLists.splice(index, 1)
      window.localStorage.setItem('content', JSON.stringify(this.myLists)) //以json格式存储数据
    },
    switchStatus(index) {
      //试下下方三个状态切换，略麻烦
      this.dataStatusIndex = index
      if (this.dataStatus[index] === '未完成') {
        this.defaultShow = false
        this.whichShow = false
      } else if (this.dataStatus[index] === '已完成') {
        this.defaultShow = false
        this.whichShow = true
      } else if (this.dataStatus[index] === '全部') {
        this.defaultShow = true
      }
    },
    clearRw() {
      //清空已完成的myLists
      this.myLists = this.myLists.filter((renw) => renw.isChecked === false)
      window.localStorage.setItem('content', JSON.stringify(this.myLists)) //以json格式存储数据
    },
    selectAllrenws() {
      //设置所有renw为已完成
      this.myLists.map(
        (renw) => (renw.isChecked = renw.isChecked ? false : true)
      )
    },
  },
  directives: {
    //自定义focus指令
    'renw-focus': function (el, binding) {
      if (binding.value) {
        el.focus()
      }
    },
  },
  created() {
    let myStorage = window.localStorage.getItem('content')
    this.myLists = JSON.parse(myStorage) || [] //因为myLists初始值是null,使用或运算符，如果为null设为空数组
  },
})
