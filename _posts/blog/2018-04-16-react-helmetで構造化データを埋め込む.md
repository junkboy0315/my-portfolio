---
layout: blog
title: react-helmetでJSON-LDを埋め込む
date: '2018-04-16T17:52:16+09:00'
dateModified: '2018-04-16T17:52:16+09:00'
---

## 概要

[セマンティック・ウェブ](https://ja.wikipedia.org/wiki/%E3%82%BB%E3%83%9E%E3%83%B3%E3%83%86%E3%82%A3%E3%83%83%E3%82%AF%E3%83%BB%E3%82%A6%E3%82%A7%E3%83%96)の一つに、構造化データというものがあります。構造化データを記載することで、データの「意味」を、クローラー等に分かりやすく伝えることができます。

場合によっては SEO 対策にもなります。例えば、Google で検索した時に下記のような「リッチスニペット」と呼ばれるものが出てくることがありますが、これは JSON-LD の構造化データを使用しています。
![リッチスニペットの例](../../static/blogImages/20180416.png)

## 方法

構造化データにもいくつか種類がありますが、今回は JSON-LD に対応してみました。

手法としては、[React Helmet](https://github.com/nfl/react-helmet)で動的にこれらのデータを埋め込んでみました。
React Helmet は、Head タグ内のデータを動的に生成してくれる便利な React コンポーネントです。

今回は各ページに Helmet を設置し、それぞれ適切な情報を出力しています。
（まったく動的になっていないので、改善の余地があります）

### index.jsx

```jsx
<Helmet
  script={[
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'http://schema.org',
        '@type': 'Corporation',
        name: 'Yuuniworks',
        url: 'http://www.yuuniworks.com/',
        logo: 'https://www.yuuniworks.com/images/logo_for_schema.png',
        address: {
          postalCode: '697-0000',
          addressCountry: 'JP',
          addressRegion: '島根県',
          addressLocality: '松江市',
          streetAddress: '殿町1番地',
        },
        contactPoint: [
          {
            '@type': 'ContactPoint',
            telephone: '+81-90-1234-5678',
            contactType: 'sales',
          },
        ],
        founder: {
          '@type': 'Person',
          givenName: '太郎',
          familyName: '山田',
        },
        foundingDate: '2018-4-11',
        description:
          '島根県浜田市を拠点に、主にフロントエンド開発のお手伝いをしているフリーランスエンジニアです。',
        sameAs: ['https://www.facebook.com/yuuniworks/'],
      }),
    },
  ]}
/>
```

### 出力結果(head タグ内)

```jsx
<script type="application/ld+json" data-react-helmet="true">
  {
    "@context": "http://schema.org",
    "@type": "BlogPosting",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": "http://www.yuuniworks.com/blog/2018-04-09-JAMStackなWebサイトの作成/"
    },
    "headline": "JAM StackなWebサイトの作成",
    "image": [
      "https://www.yuuniworks.com../../static/blogImages/20180409.png"
    ],
    "datePublished": "2018-04-09T15:00:00+09:00",
    "dateModified": "2018-04-16T17:00:00+09:00",
    "author": {
      "@type": "Person",
      "name": "Shota Tamura"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Yuuniworks",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.yuuniworks.com/images/logo_for_schema.png"
      }
    },
    "description": "JS+API+Markupで構成されるサーバレスな枠組みで、自社のWebサイトを構築してみました。"
  }
</script>
```

## 参考

- [構造化データテストツール by Google](https://search.google.com/structured-data/testing-tool/)
- [Schema.org](http://schema.org/docs/full.html)
- [Introduction to Structured Data](https://developers.google.com/search/docs/guides/intro-structured-data)
