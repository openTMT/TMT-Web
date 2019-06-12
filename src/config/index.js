export const baseURL_TMT = process.env.NODE_ENV === 'production'
  ? 'http://tmt-server.opentmt.com'
  : 'http://127.0.0.1:7892'

export const WEBSOCKET_TMT = process.env.NODE_ENV === 'production'
  ? 'ws://tmt-server.opentmt.com/websocket'
  : 'ws://127.0.0.1:7892/websocket'
