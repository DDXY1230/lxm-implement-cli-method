1. 自己写一个cli
步骤如下:
1. 初始化package.json  `npm init -y`
2. 希望的用法是  lxm creat [xxx]
3. 默认node会把可执行文件放在`bin`下面, 所以首先建一个`bin`文件夹
4. 在下面简历文件lxm `#! /usr/bin/env node` 告诉以javascript来执行
5. 在package.json文件下添加`"bin": "./bin/lxm",`
6. 此时这个模块还不能执行,必须要链接到全局下
7. 用这个命令`npm link ` 将文件夹链接到全局下
8. 如果以前链接过有这个名字,可以用`npm link --force`强制把以前链接过的给覆盖掉
9. 现在在终端直接输入`lxm`就可以执行bin/lxm里面的内容了
10. package.json里面的bin也可以写成对象的形式,相当于起别名
```
 "bin": {
    "lxm": "./bin/lxm",
    "lxm-cli": "./bin/lxm"
  },
```
11. 如果不需要了就用`npm unlik lxm`删除
12. link相当于将本地模块链接到npm目录下, 这个npm目录可以直接访问, 所以当前包就可以直接访问了


13. 我们要实现 脚手架 先做一个命令行交互的功能
14. 配置可执行命令 commander
15. 实现交互功能 inquirer
16. 将模版下载下来 download-git-repo
17. 根据用户的选择动态的生成内容 metalsmith

18. 安装commander `npm install commander`
19. 让命令后的的文本有颜色的插件`npm install chalk@4.0.0`
默认安装最新版chalk@5.0.0，可以看到源文件最后使用export default导出，所以不支持require语法。所以这里最好制定版本
14. 比文件系统更加强大的第三方 模块 ` npm i fs-extra`
15. 命令行中询问用户的插件` npm i inquirer`

16. 需要axios 发请求`npm i axios`

17. 下载模版的时候有可能失败,我们来安装一个loading效果的插件 `npm i ora`
18. 拿到仓库和版本号,接下来就是到git上下载模版啦,这个时候需要安装一个插件`npm install download-git-repo`