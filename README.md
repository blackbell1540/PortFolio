# PortFolio

- Vanilla Javascript를 사용합니다.


# 개발 환경

## WEBPACK

### mode

mode 매개 변수를 `development`, `production`, `none` 으로 설정할 수 있다. 옵션을 주지않으면 `production` 으로 설정된다.

```javascript
mode: 'development',
```

### entry

내부 종속성 그래프 작성을 시작하기 위해 번들링 프로세스를 시작할 지점을 지정한다.
이 프로젝트에서는 페이지 라우팅을 기준으로 여러 entry point를 지정했다. 

```javascript
entry: {
    main: {
        import: './src/index.js',
    },
    todolist: {
        import: './src/todolist/index.js',
    }
},
```

### output

웹팩이 컴파일 된 파일을 어디에 생성할지 지정한다. output은 오직 하나만 지정할 수 있다.
이 때 `[name]`을 사용하면 원본 파일의 이름을 그대로 사용할 수 있다.

```javascript
output: {
    filename: 'js/[name].js',
    path: path.resolve(__dirname, 'dist'),
    clean: true
},
```

### devServer

1. `hot: true` 설정:  코드 수정시 마다 자동으로 웹페이지가 새로고침되어 수정사항을 확인할 수 있게 한다.
2. watchFiles: 수정 사항을 트래킹할 파일의 범위를 지정한다.

```javascript
devServer: {
    hot: true,
    watchFiles: [
        'src/*',
        'src/todolist/*'
    ],
    port: 9000
},
```

### plugins

1. `html-webpack-plugin` 패키지를 사용하여 src의 index.html을 dist폴더에 생성되게 한다. 이 때 entry 항목의 이름으로 chunk를 지정하면 그 entry 포인트를 기준으로 청크파일을 생성한다.

```javascript
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html',
            chunks: ['main']
        }),
        new HtmlWebpackPlugin({
            template: './src/todolist/index.html',
            filename: 'todolist/index.html',
            chunks: ['todolist']
        }),
    ],
```

### module

1. 여러개의 로더를 사용할 때에는 use를 사용한다.

    뒤에서 부터 실행되므로 css-loader가 먼저 실행되고 그 결과물을 style-loader를 실행한다. 여기서는 css-loader로 css파일을 읽어서 
style-loader로 style태그로 변환하여 html head태그 안에 삽입되도록 하고 있다.

    **번들 대상에 포함되게 하려면(엔트리포인트로부터 찾아갈 때) js파일 상단에 import 해줘야한다.**

```javascript
module: {
    rules: [
        { test: /\.css$/, use: ['style-loader', 'css-loader'] },
    ]
}
```

# 코드 설명
