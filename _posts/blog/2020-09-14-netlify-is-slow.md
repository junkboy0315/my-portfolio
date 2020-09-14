---
layout: blog
title: Netlifyは遅い
summary: Netlifyはスループットが非常に悪いようです
date: 2020-09-14T15:00:00Z
dateModified: 2020-09-14T15:00:00Z
---

## Netlify は遅い

ここ数年、Netlify に大変お世話になってきました。とても便利で助かっているのですが、実はスループットがとても悪いということに気が付きました。

これに気づいたのは Storybook のサイトを構築したときでした。Storybook は JavaScript のバンドルサイズがどうしても 2MB 程度になってしまうのですが、これをダウンロードするのに十数秒かかっていることが分かったのです。

調べてみると、Netlify の無料プランの場合、CDN は世界で 8 箇所しかなく、日本は含まれていないそうです。サポートに問い合わせたところ、日本での CDN を有効にする場合は月額 3000 ドルから（！！！）のエンタープライズ契約が必須だそうです。ブッ飛びますね！

代替手段を検討してみた結果をまとめたものが下記です。測定には[fastorslow.com](https://www.fastorslow.com/)などを使いました。

| service          | price                                      | スループット | RTT     |
| ---------------- | ------------------------------------------ | ------------ | ------- |
| Netlify          | 200GB まで無料<br/>以降従量制              | 約 100KB/s   | 約 50ms |
| Github pages     | 100GB まで無料<br/>超えたら追い出される(!) | 数 MB/s      | 約 5ms  |
| Firebase hosting | 10GB まで無料<br/>以降従量制               | 数 MB/s      | 約 5ms  |

Firebase と Github pages で悩みましたが、下記の理由から今回は github pages を利用することにしました。

- スループットやレイテンシにほぼ差がないこと
- デプロイの手間はどちらでもさして変わらかったこと(github actions 利用)
- 無料枠が github pages のほうが大きいこと

ちなみに、github actions は以下のようにしています。

```yaml
name: MyActions

on: [push]

jobs:
  deploy-to-github-pages:
    runs-on: ubuntu-latest

    steps:
      # CD環境にコードをチェックアウト
      - uses: actions/checkout@master

      # Node.js環境のセットアップ
      - uses: actions/setup-node@master
        with:
          node-version: '12.18.3'

      # 効率化のためにnode_modulesをキャッシュする
      - name: Cache node modules
        uses: actions/cache@v1
        with:
          path: node_modules
          key: ${{ runner.OS }}-build-${{ hashFiles('**/yarn.lock') }}
          restore-keys: |
            ${{ runner.OS }}-build-${{ env.cache-name }}-
            ${{ runner.OS }}-build-
            ${{ runner.OS }}-

      # npmパッケージのインストール
      - run: yarn

      # 静的ファイルのビルド
      - run: yarn build-storybook

      # gh-pagesブランチへ静的ファイルをプッシュ
      - name: Deploy to Github pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          # GITHUB_TOKENは自動でセットされるので何もしなくてOK
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./storybook-static
```

上記を走らせると`gh-pages`ブランチに、指定したフォルダの内容がプッシュされます（上記では`./storybook-static`に生成されたファイル）。あとは github のコンソールから、pages として公開するブランチをポチッと選べば完了です。
