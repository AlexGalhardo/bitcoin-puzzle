<div align="center">
 <h1 align="center"><a href="https://privatekeyfinder.io/bitcoin-puzzle/" target="_blank">Bitcoin Puzzle</a></h1>
</div>

https://github.com/AlexGalhardo/bitcoin-puzzle/assets/19540357/8e4f18ca-f321-4c67-a8ab-7f79d470d7ab

## Introduction

- Simple scripts to learn more about bitcoin puzzle quest
- References:
   - https://privatekeyfinder.io/bitcoin-puzzle/
   - https://www.youtube.com/watch?v=Ispg4D9_hv8
   - https://www.youtube.com/watch?v=679Zc7ZQLtI
   - https://api.blockcypher.com/v1/btc/main/addrs/1H3yHoihwTpZRE3hfnhTky8e3PF5mjygUh/balance
   - https://github.com/lmajowka/btcgo
   - https://github.com/lmajowka/btc-finder
   - https://github.com/albertobsd/keyhunt

## Development Setup Local

Prerequisites:
   - Install Bun: https://bun.sh/docs/installation

1. Clone repository
```bash
git clone git@github.com:AlexGalhardo/xandyh-bitcoin-puzzle.git
```

2. Enter repository
```bash
cd bitcoin-puzzle/
```

3. Install dependencies
```bash
bun install
```

4. Creating bitcoin addresses
```bash
bun run create-bitcoin-addresses
```

5. Creating bitcoin addresses and checking balance
```bash
bun run create-and-check-balance
```

## License

[MIT](http://opensource.org/licenses/MIT)

Copyright (c) July 2024-present, [Alex Galhardo](https://github.com/AlexGalhardo)
