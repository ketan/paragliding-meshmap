# paragliding-meshmap

# Deployment

```bash
yarn install
yarn run docker:build
docker run -it -e DATABASE_URL=postgres://username:password@hostname:port/database-name paragliding-meshmap
```

# Development

Here's how you set up a development environment for contributing to paragliding-meshmap. The first step
is to run a postgres database. Keep this running in a terminal:

```bash
docker run --env=POSTGRES_USER=postgres --env=POSTGRES_PASSWORD=postgres --env=POSTGRES_DB=meshmap -p 5432:5432 --volume=pgdata:/var/lib/postgresql/data -ti postgres:alpine
```

Set up an environment for your ```yarn``` commands:

```bash
cp .env.sample .env.development.local
```

Update the following line in ```.env.development.local``` to connect to the database server you
started above.

```
DATABASE_URL=postgres://postgres:postgres@localhost:5432/meshmap
```

Now build the dependencies and run the backend and frontend together:

```bash
yarn install
yarn run build
yarn run start --mqtt-topics 'msh/#' --mqtt-broker-url=mqtt://mqtt.bircom.in --no-mqtt
```

Connect to http://localhost:5173 in your web browser, and the application should show up.
In order to get actual data showing up in the map, you'll need to request credentials to access
the MQTT (message queuing) server. Contact @ketan about this. Once and if you have them,
run the app like this:

```
yarn run start --mqtt-topics 'msh/#' --mqtt-broker-url=mqtt://mqtt.bircom.in --mqtt-username xxx --mqtt-password yyy
```

Connect again in your web browser. Be patient as the packets take time to trickle in from devices.
Watch your console logs too, as various packets of node and position data come in, they'll show
up as ```INSERT``` database statements.

## Debugging/Troubleshooting

You can debug/troubleshoot things by setting the `DEBUG` variable using the `.env.development.local` file (or setting the `DEBUG` variable directly). Logging is enabled via the [`debug`](https://www.npmjs.com/package/debug) library, and you may checkout advanced usage in the debug library documentation.

The following values are supported for debugging

| Value | Usage |
|---|---|
| `typeorm:*` | Enables debugging of `typeorm` used for running DB queries. See [this file]([https://github.com/typeorm/typeorm/blob/master/src/logger/DebugLogger.ts](https://github.com/typeorm/typeorm/blob/e7649d2746f907ff36b1efb600402dedd5f5a499/src/logger/DebugLogger.ts#L13-L23)) for more fine grained logging options |
| `meshmap:*` | Enable logging options for different features in this application. See [this file](https://github.com/ketan/paragliding-meshmap/blob/main/src/helpers/logger.ts) for more fine grained logging options |
| `mqtt:*` | Enable logging options for the [mqttjs](https://github.com/mqttjs/MQTT.js) library. |

# Credits

- [meshtastic](https://meshtastic.org) for building the great software that allows all of this to work.
- [Liam Cottle](https://meshmap.app/) for the great work on the original map app, we are using the same codebase with
  lots of modifications.

# License

```
MIT License

Copyright (c) 2024 Ketan Padegaonkar

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```
