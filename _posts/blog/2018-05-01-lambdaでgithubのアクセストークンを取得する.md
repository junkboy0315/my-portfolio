---
layout: blog
title: LambdaでGithubのアクセストークンを取得する
date: '2018-05-01T19:03:56+09:00'
dateModified: '2018-05-01T19:03:56+09:00'
---

## アクセストークンの取得

OAuth を Web アプリに実装する際、まずアクセストークンを取得する必要があります。

Google や Facebook の場合、SDK を使ってフロントエンド側だけで取得できます。
下記のような便利なコンポーネントもあり、頻繁に更新されています。

- [react-google-login](https://github.com/anthonyjgrove/react-google-login)
- [react-facebook-login](https://github.com/keppelen/react-facebook-login)

ところが、Github の場合はフロントエンド側だけではトークンを取得できません。
サーバが存在することを前提に認証を行う枠組みになっているためです。

## Github の OAuth 認証の動き

Github の場合は、認証画面からリダイレクトで戻ってきたとき、トークンではなく`code`というものを渡されます。
基本的には、この`code`を下記の API に POST してやれば、トークンが取得できます。

```
POST https://github.com/login/oauth/access_token
```

ところが、このエンドポイントには CORS が設定されていないため、フロントエンドから取得するとエラーがでます。

サーバ側で`code`をトークンと交換する処理をしなさい、ということなのでしょう。
しかし、Web アプリをサーバレスで運用している場合は、トークンが取得できないということになります。
バッドノウハウで無理矢理取得できないこともないのですが、美しくありません。

## Lambda でアクセストークンを取得

この問題を解決するため、今回は Lambda Function を作成して対応しました。

- [github-token-getter](https://github.com/junkboy0315/github-token-getter)

Github から受けとった`code`を param に付与して GET を叩けば、トークンが返ってくるという単純なものです。

![Lambdaを使ったGithubのOAuthの流れ](../../static/blogImages/20180501.png)

叩く

```
GET https://your.api.gateway/getToken?code=CODE_FROM_GITHUB
```

トークン帰ってくる

```
{ "accessToken": "a1b2c3........" }
```

なお、CODE を取得するまでの処理は、下記のコンポーネントを使うと便利です。

- [react-github-login](https://github.com/checkr/react-github-login)

## 参考

- [(Github) Authorization options for OAuth Apps](https://developer.github.com/apps/building-oauth-apps/authorization-options-for-oauth-apps/#web-application-flow)
