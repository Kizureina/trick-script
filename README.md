# 一些简单的前端脚本
程序员的哲学是:**做三遍以上同样的事，就该思考能否简化流程**。
所以我写了一些简单的js脚本，方便大家使用，主要用在CUIT相关网站。
## 快速开始
### 1. 一键评教
打开评教页面，把`teaching-evaluation-in-single-click.js`的代码粘贴到控制台跑就可以。
意见默认写的是“无意见”。
注意：保险起见我只写了填充而不会提交，检查之后再手动提交比较好。
### 2. 课程中心一键下载所有文件
打开课程页面，点击“已加入学习”，进入到有所有文件的页面即可。
然后把`kczx-download-file-all-in-one.js`里的代码粘贴到控制台跑即可批量下载。

### 3. 批量正则重命名文件

下载压制组动画效率很高，但有个比较麻烦的问题，字幕与源视频名不匹配，每次都有把字幕文件拖进视频，实在很不优雅。

所以写了个简单的bash脚本，模板文件名直接修改就好。（如果有WSL用起来更方便）
