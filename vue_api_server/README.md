#### 项目整体文件说明
- `config` 配置文件目录
  - `default.json` 默认配置文件（其中包含数据库配置，jwt配置）
- `dao` 数据访问层，存放对数据库的增删改查操作
  - `DAO.js` 提供的公共访问数据库的方法
- `models` 存放具体数据库 ORM 模型文件
- `modules` 当前项目模块
  - `authorization.js` API权限验证模块
  - `database.js` 数据库模块（数据库加载基于 nodejs-orm2 库加载）
  - `passport.js` 基于 passport 模块的登录搭建
  - `resextra.js` API 统一返回结果接口
- `node_modules` 项目依赖的第三方模块
- `routes` 统一路由
  - `api` 提供 api 接口
  - `mapp` 提供移动APP界面
  - `mweb` 提供移动web站点
- `services` 服务层，业务逻辑代码在这一层编写，通过不同的接口获取的数据转换成统一的前端所需要的数据
- `app.js` 主项目入口文件
- `package.json` 项目配置文件



`npm link` 是 npm（Node Package Manager）提供的一个命令，它用于创建一个全局链接的包。当你想要在本地开发和测试一个 npm 包时，这个命令非常有用，尤其是当你正在开发一个包，并且想要在其他本地项目中立即测试它而不必每次都发布到 npm 仓库。

当你运行 `npm link` 命令时，它会在全局 npm 链接目录中创建一个符号链接（symlink），指向你的包的安装位置。然后你可以在其他项目中通过 `require('package-name')` 来引用这个全局链接的包，而不是安装一个特定的版本。

具体来说，如果你在开发一个名为 `mysql` 的包（或者任何其他包），你可以这样做：

1. 在你的包的目录下运行 `npm link`。这会创建一个全局链接。

   ```bash
   cd path/to/mysql
   npm link
   ```

2. 切换到你想要使用这个包的项目目录，然后运行 `npm link package-name`，其中 `package-name` 是你的包的名称。这会在项目的 `node_modules` 目录中创建一个指向全局链接包的符号链接。

   ```bash
   cd path/to/your/project
   npm link mysql
   ```

现在，你的项目就会使用全局链接的 `mysql` 包，而不是安装一个副本。任何对 `mysql` 包的本地更改都会立即反映在使用它的项目中。

请注意，`npm link` 与 MySQL 数据库本身无关，它只是一个用于本地开发 npm 包的工具。如果你想要在你的 Node.js 项目中使用 MySQL 数据库的连接功能，你需要安装 `mysql` 或 `mysql2` 这样的 npm 包，并在项目中配置数据库连接。
