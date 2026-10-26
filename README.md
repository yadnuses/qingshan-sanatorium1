<div align="center">

<br>

# 青 山 疗 养 院

### QINGSHAN SANATORIUM

<sub>互动文字解谜 · 1998</sub>

<br>

[![Play](https://img.shields.io/badge/▶_开_始_调_查-1a1d1a?style=for-the-badge&labelColor=a33b2b)](https://qingshan-sanatorium1.top/)

<br>

`93 个页面` · `6 层秘密` · `4 个结局`

<br>

</div>

---

<div align="center">

## 你叫周明远，是一名调查记者

</div>

三个月前，你的妹妹在青山疗养院离奇失踪。警方调查无果，院方坚称「从未有过此人」。

但你找到了妹妹的日记：

> 「地下三层有东西，他们在做实验……」
>
> 「林院长不是人，他已经活了很久……」
>
> 「陈护士知道真相，但她不敢说出来……」

你决定亲自调查这座位于城郊的疗养院。然而，当你踏入大门的那一刻，某种诡异的感觉笼罩了你——

**这里的一切，仿佛都在等待你的到来。**

<br>

---

<div align="center">

## 怎么玩

</div>

<table>
<tr>
<td width="50%" valign="top">

**核心机制**

在搜索框输入关键词，解锁相关页面。页面中又隐藏着新的关键词线索。层层深入，拼凑真相。

- 注意页面中**红色标记**的文字
- 点击可疑的人名、地名
- 部分页面需要密码解锁
- 建议打开声音，部分页面有音频线索

</td>
<td width="50%" valign="top">

**结构**

| 层级 | 内容 |
|:---|:---|
| 表面 | 官网、科室、医护团队 |
| 一层 | 青山市、院长、护士 |
| 二层 | 员工档案、值班记录 |
| 三层 | 地下设施 |
| 四层 | 实验记录 |
| 五层 | 长生会 |
| 六层 | 真相 |

共 **93 个页面**，**6 层**递进，**4 个结局**（3 个普通 + 1 个真结局）。

</td>
</tr>
</table>

<br>

---

<div align="center">

## 关于这个项目

</div>

一个纯静态的互动叙事网站，没有任何后端。所有逻辑跑在浏览器里：关键词匹配、页面解锁、进度存档、多结局判定。

<div align="center">

<table>
<tr>
<td width="50%" valign="top">

**技术**

- 纯静态 HTML / CSS / JavaScript
- 无框架、无构建步骤
- 无后端，无数据库
- 进度存于浏览器本地
- 托管于 GitHub Pages

</td>
<td width="50%" valign="top">

**体量**

- 93 个 HTML 页面
- 5.5 MB 图像
- 21 MB 音频
- 23 MB 字体
- 仓库总计约 163 MB

</td>
</tr>
</table>

</div>

### 目录结构

```
├── index.html            调查员须知（入口）
├── main.html             疗养院官方网站
├── pages/                公开页面
│   ├── about.html        关于我们
│   ├── staff/            医护团队
│   ├── departments/      科室介绍
│   └── secret/           隐藏内容
│       ├── layer1/       第一层（11 页）
│       ├── layer2/       第二层（15 页）
│       ├── layer3/       第三层（13 页）
│       ├── layer4/       第四层（9 页）
│       ├── layer5/       第五层（5 页）
│       └── layer6/       第六层（7 页）
├── kouye/                分线剧情
├── nanguo/               分线剧情
├── audio/                环境音与线索音频
├── images/               图像素材
├── fonts/                字体
└── js/                   交互逻辑
```

<br>

---

<div align="center">

## 开发与运行

</div>

```bash
# 克隆
git clone https://github.com/yadnuses/qingshan-sanatorium1.git

# 本地预览（必需，直接双击打开会有路径问题）
cd qingshan-sanatorium1
python3 -m http.server 8000

# 浏览器访问
open http://127.0.0.1:8000/
```

**为什么需要本地服务器**：页面之间用相对路径跳转，且部分功能读取本地文件。用 `file://` 协议打开会失败。

<br>

---

<div align="center">

## 通关攻略

</div>

仓库内附有 `游戏通关攻略.md`，包含完整的关键词表与各层线索路径。

⚠️ **内含剧透**，建议卡关时再看。

<br>

---

<div align="center">

<sub>

**本游戏纯属虚构。** 故事、人物、机构均为创作，与现实无关。<br>
部分图像与音频素材来自公开授权资源，版权归原作者所有。<br>

<br>

`© 1998 YADNUS · 青山疗养院`

<br>

</sub>

</div>
