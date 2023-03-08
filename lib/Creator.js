const Inquirer = require("inquirer");
const { fetchRepoList, fetchTagList } = require("./request");
const { wrapLoading } = require('./util')
const downloadGitRepo = require('download-git-repo') // 不支持promise,需要自己变成promise
const util = require('util')// node自带的包转化promise
const path = require('path')
class Creator {
  constructor(projectName, targetDir) {
    // new 的时候会调用构造函数
    this.name = projectName;
    this.target = targetDir; // 到时候模版被下载到这个目录下
    // 此时downloadGitRepo就被我转化成promise方法了
    this.downloadGitRepo = util.promisify(downloadGitRepo)
  }
  async fetchRepo() {
    // 这里下载有可能失败,我们来安装一个loading效果的插件 npm i ora
    let repos = await wrapLoading(fetchRepoList, "waiting fetch template");
    // let repos = await fetchRepoList()
    console.log('拉取模版成功',repos)
    if (!repos) {
      return;
    }
    repos = repos.map((item) => item.name);
    console.log("repos", repos);
    let { repo } = await Inquirer.prompt({
      name: "repo",
      type: "list",
      choices: repos,
      message: "please choose a template to create project",
    });
    return repo
  }
  async fetchTag(repo) {
    let tags = await wrapLoading(fetchTagList, 'waiting fetch tag', repo)
    // console.log('拿到tags版本号', tags)
    tags = tags.map((item) => item.name);
    let { tag } = await Inquirer.prompt({
      name: "tag",
      type: "list",
      choices: tags,
      message: "please choose a template to create project",
    });
    return tag
  }
  async download(repo,tag) {
    try{

    // 1. 需要拼接出下载路径
    let requestUrl = `lxm-cli/${repo}${tag?'#'+tag:''}`
    // 2. 把资源下载到某个路径下 (后续这里可以增加缓存功能, 应该下载到系统目录中, 稍后可以再使用ejs handlerbar
    // 去渲染模版 最后生成结果 在写入)
    await this.downloadGitRepo(requestUrl, this.target)
    // await this.downloadGitRepo(requestUrl, path.resolve(process.cwd, `${repo}@${tag}`))
    console.log('下载成功', this.target)
    return this.target
    }catch (e) {
      console.log(e)
    }
  }
  async create() {
    console.log(this.name, this.target);
    // 真实开始创建
    // 1. 先去拉取当前组织下的模版
    let repo = await this.fetchRepo(); // 拿到仓库
    console.log('拿到仓库', repo)
    //2. 再通过模版找到版本号
    let tag = await this.fetchTag(repo)
    console.log('拿到版本号', tag)
    //3. 下载模版
    let downloadUrl = await this.download(repo, tag)
    //4. 编译模版
  }
}
module.exports = Creator;
