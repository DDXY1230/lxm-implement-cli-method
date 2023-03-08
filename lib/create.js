const path = require('path')
// const fs = require('fs')
const fs = require('fs-extra') // 这个比fs更加强大
const Inquirer = require('inquirer')
const Creator = require('./Creator')
module.exports = async function(projectName, options) {
  // 创建项目
  const cwd = process.cwd()//Users/前端项目demo/lxm-cli/
  const targetDir = path.join(cwd, projectName)
  console.log(targetDir)//Users/前端项目demo/lxm-cli/aa
  console.log('options',options)
  console.log('是否已存在', fs.existsSync(targetDir))
  if(fs.existsSync(targetDir)){
    // 判断这个目录当前有
    if(options.force) { // 强制删除以前的
      await fs.remove()
    }else {
      // 提示用户确定要覆盖
      let { action } = await Inquirer.prompt([// 配置询问方式
        {
          name: 'action',
          type: 'list',// 类型很多,checkbox input等
          message: 'Target directory already exists Pick an action',
          choices: [
            {name: 'Overwrite', value: 'overwrite'},
            {name: 'Cancel', value: false}
          ]
        }
      ])
      console.log('action', action)
      if(!action) {
        // 取消
      }else {
        console.log(`\r\n Removeing....`)
        await fs. remove(targetDir) // 删除目标目录
      }
    }
  }
  // 创建项目
  let creator = new Creator(projectName, targetDir)
  creator.create() // 开始创建

}