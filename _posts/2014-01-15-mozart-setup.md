---
layout: post
title: Mozart setup
description: "How to install and play mozart"
modified: 2014-01-15
tags: [chinese, mozart, open source, nodejs knockout 2013]
---

# Mozart

沒錯，人人都可以是指揮家 - 這是 Mozart 計畫所期望達到的目標。我們只要簡單的搖晃手機，身邊的電腦就如同交響樂團般演奏出屬於我們的音樂。實際的玩法，我們可以參考下面這段影片:

<iframe width="560" height="315" src="https://www.youtube.com/embed/JvXZ2bpX15M" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

Mozart 計畫是一個參加 node.js knockout 2013 比賽的音樂節奏遊戲。這篇文章將介紹如何在我們的電腦中安裝及設定好 Mozart。

## 計畫介紹

Mozart 計畫在 node.js knockout 2013 比賽一結束後，就立馬將源始碼放在 github 上，即 https://github.com/moz-art/mozart 。Mozart 完全採用 Web APP 及 Web API 完成的遊戲。首先，它利用手機的三軸加速計 (Device Motion) 來測量搖晃的速度，透過 WebSocket 技術將測量出來的速度傳輸到多台電腦後，再使用 WebAudio 技術依照搖晃的速度，將一個一個的音符播放出來。

## 下載源始碼

我們可以直接透過這個網址來把壓縮好的源始碼下載回來：下載這裡。下載並解壓縮完成後可以看到像下面的程式碼：

<figure>
	<img src="/images/mozart/source.png" alt="source code image">
	<figcaption>源始碼</figcaption>
</figure>

## 安裝 node.js

Mozart 是參加 node.js 比賽，就一定要安裝最新版本的 node.js 了。我們可以在 http://nodejs.org/download/ 下載到可以安裝的 node.js 安裝檔。安裝完成後，我們可以在命令列中輸入 node --version 進行確認，例如：

<figure>
	<img src="/images/mozart/check-node-version.png" alt="check node version">
	<figcaption>node --version</figcaption>
</figure>

## 安裝相依函式庫

因為 Mozart 計畫是使用 node.js 來開發，所以安裝相依函式庫的方式非常的簡單，我們只要輸入 npm install 就能開始啟動安裝程序：

<figure>
	<img src="/images/mozart/npm-install.png" alt="npm install">
	<figcaption>npm install</figcaption>
</figure>

安裝完成後，我們可以看到像下面的相依關係圖：

<figure>
	<img src="/images/mozart/after-npm-install.png" alt="the result of npm install">
	<figcaption>after npm install</figcaption>
</figure>

## 啟動程式

Mozart 的主程式入口是 server.js，所以我們可以透過 sudo node server.js 來啟動它。但是，為什麼要用 sudo 呢？因為它會使用 express 及 ws 模組來啟動網站伺服器。如果，大家是用 Windows，記得要用管理員權限來執行它。啟動後，命令列的畫面會像：

<figure>
	<img src="/images/mozart/start-app.png" alt="start the mozart server">
	<figcaption>start the mozart server</figcaption>
</figure>

如果我們遇到 EADDRINUSE 的錯誤時，就代表我們要使用的 80 port 被其它應用程式使用了。錯誤的畫面如下：

<figure>
	<img src="/images/mozart/error-port-in-use.png" alt="error address in use">
	<figcaption>error address/port in use</figcaption>
</figure>

此時，我們可以把用到 80 port 的程式給關閉。如果，我們不想這樣的話，也可以改一下源始碼，讓它變成是 8080 或是使用任何我們想用的 port。以下圖為例，我們可以把第2行的 production 改成 false 或是，直接把第 9 行的 port 寫一個固定的數值：

<figure>
	<img src="/images/mozart/modify-port.png" alt="how to modify port">
	<figcaption>how to modify port</figcaption>
</figure>

## 開始指揮囉

最後，我們只需要打開自己的 Firefox，在網址例中輸入 http://localhost/，就可以依照指示開始指揮囉。如果，我們有改過 port 的話，我們需要輸入 http://localhost:[port]/ 後就可以了。

<figure>
	<img src="/images/mozart/game.png" alt="game screenshot">
	<figcaption>game screenshot</figcaption>
</figure>


最後，還是要不免俗地介紹一下 Mozart 計畫的團隊成員：

* ![evanxd](http://gravatar.com/avatar/c41f912d929a213cba048104b3697b88?s=60&d=retro) evanxd — Taoyuan — UX and server
* ![john-hu](http://gravatar.com/avatar/c684d29e2c44d50013c914889794e852?s=60&d=retro) john-hu — Taichung — music player
* ![yurenju](http://gravatar.com/avatar/a357616c0a9197fccbaf5aceb92d94f3?s=60&d=retro) yurenju — Taipei — conductor device
* ![rexboy7](http://gravatar.com/avatar/ba973db1f571a1bc3ac86cb4d674c32a?s=60&d=retro) rexboy7 — Taiwan — MIDI
