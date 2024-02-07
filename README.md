# daily-phrase-web

### 🔧 install

```shell
pnpm install
```

### ⚡️ develop

```shell
pnpm dev:packages
```

> NOTICE: `web`, `back-office`에 `env`를 설정해야 합니다.

```shell
pnpm web dev
```

```shell
pnpm back-office dev
```

### 🚀 production

```shell
pnpm web install:clear
pnpm web build
pnpm web start
```

```shell
pnpm back-office install:clear
pnpm back-office build
pnpm back-office start
```
