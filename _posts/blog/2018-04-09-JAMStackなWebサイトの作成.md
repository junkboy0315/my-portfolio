---
layout: blog
title: JAM StackなWebサイトの作成
date: '2018-04-09T15:00:00+09:00'
dateModified: '2018-04-18T23:00:00+09:00'
---

新しく Web サイトを作成する機会があり、せっかくなので [JAM Stack](https://jamstack.org/) と呼ばれる手法で構築してみました。JAM Stack は、JS+API+Markup で構成されるサーバレスな枠組みです。

## JAM Stack とは

### 特徴

- フロントエンドがバックエンドから完全に分離されている
- [Static Site Generator](https://www.staticgen.com/) を用いるなどして、事前に静的ファイル（HTML、JS）をビルドする
- 画面描写は基本的に JS のみで行う
- ビルドしたファイルは全て CDN で配布する
- すべてのプロジェクトデータは Git 上で管理する
- Babel, PostCSS, Webpack など最新のビルドツールを使う
- 自動ビルド・自動デプロイ
- サーバサイドの機能が必要な時は Ajax で API をたたく

### メリット

- 高パフォーマンス
- 高セキュリティ
- スケーリングが容易で安価
- デベロッパフレンドリー

### デメリット

- クライアントとサーバが強く結びついている web アプリには原則として適用できない

## 今回構築した Web サイトについて

### URL

<a href="https://www.yuuniworks.com" target="_blank">https://www.yuuniworks.com</a>
（<a href="https://github.com/junkboy0315/yuuni-web" target="_blank">ソースコード</a>）

### 構成図

![構成図](../../static/blogImages/20180409.png)

### 特徴

標準的な JAM Stack の構成に加え、下記の二つの機能を追加しています。

- Netlify CMS による GUI を用いたコンテンツ編集機能
- 問合せメール送信機能（API 側は AWS API Gateway+Lambda+SES で実装）

### 使用したソフトウェア・サービス等

| Name                  | Description            |
| --------------------- | ---------------------- |
| React                 | UI                     |
| Gatsby                | Static Site Generator  |
| AWS(API, Lambda, SES) | 問合せメール送信用 API |
| Netlify               | CI/CD                  |
| NetlifyCMS            | CMS                    |

### Gatsby のプラグイン

Gatsby では、Web サイトでよく使われる機能について、あらかじめプラグインが用意されています。これをうまく使用することで、車輪の再発明をしなくてよい設計になっています。今回は、下記のプラグインを使用しました。

#### gatsby-plugin-glamor

下記のような、css-in-js を使えるようにする。

```javascript
<div css={{
  marginHeight: '1rem',
  display: this.state.isVisible ? 'block' : 'none',
}}>
```

#### gatsby-plugin-react-helmet

react-helmet に記載した内容を、自動でサーバサイドレンダリングする（JS をレンダリングできないクローラーのための SEO 対策）。

#### gatsby-plugin-feed

ブログ等の rss を自動生成する。

#### gatsby-plugin-google-analytics

google analytics 用コードを自動で設置する。

#### gatsby-plugin-google-tagmanager

google tag manager 用コードを自動で設置する。

#### gatsby-plugin-sentry

[Sentry](https://sentry.io/welcome/) (クライアント側エラーのログ管理)用コードを自動で設置する。

#### gatsby-plugin-sitemap

サイトマップを自動生成する。

#### gatsby-plugin-typography

グローバル CSS を美しく設定する。

#### gatsby-remark-prismjs

markdown ファイル内のコード記述部を装飾して表示する。

```javascript
const description = 'こんな感じです。';
console.log('多くの言語に対応してます。');
```

#### gatsby-remark-images

markdown ファイルにある画像を検出し、解像度の異なる画像を自動生成するなど、自動で最適化する。

```jsx
<img
  src="/static/20180409-cc8c83772885665d168373b6dc1c9bf7-2f183.png"
  srcset="
    /static/20180409-cc8c83772885665d168373b6dc1c9bf7-67829.png 125w,
    /static/20180409-cc8c83772885665d168373b6dc1c9bf7-5c59f.png 250w,
    /static/20180409-cc8c83772885665d168373b6dc1c9bf7-2f183.png 500w,
    /static/20180409-cc8c83772885665d168373b6dc1c9bf7-c93e8.png 750w,
    /static/20180409-cc8c83772885665d168373b6dc1c9bf7-4e628.png 1000w,
    /static/20180409-cc8c83772885665d168373b6dc1c9bf7-9260f.png 1463w"
  sizes="(max-width: 500px) 100vw, 500px"
/>
```

#### gatsby-remark-relative-images

前述の gatsby-remark-images は、画像リンクが相対パスでないと機能しない。NetlifyCMS でアップした画像は必ず絶対パスになってしまうため、画像が最適化されない。この問題を解消するため、このプラグインを使ってあらかじめ絶対パスを相対パスに書き換える。

## 所感

- コストがかからない
- サーバ性能を気にしなくてよい
- すべてが速い
- はじめからグローバルを前提とした設計である

など、多くの点に強い魅力を感じました。

ドキュメントサイトや、サーバサイドにそれほど複雑な機能を必要としないコーポレートサイトなどには適した手法だと思います。

なにより、`git push` だけで世界中の CDN に静的ファイルが配置でき、開発者に優しくてよいです。そのうえ、今回のように CMS を入れれば、ユーザに優しい GUI を使ってコンテンツを更新することもできます。

JAM Stack、今後、日本でも採用が増えていくと思います。

## 参考

- [Gatsby の使い方](https://www.gatsbyjs.org/tutorial/)
- [Netlify で CI/CD 環境を構築する方法](https://www.netlify.com/blog/2016/02/24/a-step-by-step-guide-gatsby-on-netlify/)
- [Netlify CMS の Gatsby への実装方法](https://www.netlifycms.org/docs/add-to-your-site/)
- [AWS Lambda で静的サイトにメール送信フォームを作る簡単な方法](https://blog.craftz.dog/aws-lambda%E3%81%A7%E9%9D%99%E7%9A%84%E3%82%B5%E3%82%A4%E3%83%88%E3%81%AB%E3%83%A1%E3%83%BC%E3%83%AB%E9%80%81%E4%BF%A1%E3%83%95%E3%82%A9%E3%83%BC%E3%83%A0%E3%82%92%E4%BD%9C%E3%82%8B%E7%B0%A1%E5%8D%98%E3%81%AA%E6%96%B9%E6%B3%95-de8cba5e50a5)
