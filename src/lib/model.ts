export type Cert = string // 证书 base64
export type CertId = string // 证书标识（ usbkey 实体标识）
export type CertUniqueId = string  // 证书唯一标识
export type MsgId = number
// normal callback or resolve of Promise
export type MsgQueueCb = (value: string | number) => void
export type SendArgs = Array<string | number> | string | number
export type PlainText = string  // 明文
export type EncodedText = string  // base64格式签名数据

export const enum DeviceType {
  hard = 'HARD',
  soft = 'SOFT',
}

export interface WsSendData {
  xtx_func_name: string
  call_cmd_id: string // string of msgId
  URL?: string
  [param: string]: string | number | void
}

export interface WsRecvData {
  call_cmd_id: string | SrvEvent  // String(msgId) | SrvEvent
  retVal: string
}

export interface UserInfo {
  certId: string
  username: string    // ? CertInfo.subject_cn
}

export interface WsOpts {
  host: string
  ports: number[]
  keepAliveInterval: number
}

export interface InitialWsOpts extends Partial<WsOpts> { }


export const enum Actions {
  exception = 'exception',
  initial = 'initial',
  invalidRecvedData = 'invalidRecvedData',
  invalidRecvCb = 'invalidRecvCallbackFunction',
  noneAvailable = 'eventNoneAvailable',
  wsConnected = 'connected',
  wsClosed = 'socketClosed',
  wsClosedException = 'socketClosedWithException',
  wsDisconnected = 'disconnected',
  wsNoneAvailable = 'wsNoneAvailable',
  wsSend = 'wsSend',
  wsRecv = 'wsRecv',
}

export interface WsEvent {
  action: Actions | SrvEvent
  msg?: string
  msgId?: MsgId
  payload?: WsRecvData | WsRecvData | Error,

}

// ws服务端调用方法
export enum SrvMethod {
  changeUserPIN = 'SOF_ChangePassWd',  // 修改用户口令
  getCertEntity = 'SOF_GetCertEntity',  // 获取证书唯一标识
  getDeviceInfo = 'GetDeviceInfo',  // 设备信息
  genRandom = 'SOF_GenRandom',  // 获取服务器提供的随机数
  getSignCert = 'SOF_ExportUserCert',
  getVersion = 'SOF_GetVersion',
  getUserList = 'SOF_GetUserList',  // 用户列表
  getCertInfo = 'SOF_GetCertInfo',  // 获取证书信息
  signData = 'SOF_SignData',  // 签名
  validateCert = 'SOF_ValidateCert',  // 验证证书有效性
  verifySignedData = 'SOF_VerifySignedData',  // 验证数据签名
  verifyUserPIN = 'SOF_Login',  // 验证用户（证书）口令
}

// ws服务端推送事件名
export enum SrvEvent {
  onUsbkeyChange = 'usbkeyChange',
  onDebugChange = 'debugChange',
  onUnknownEvent = 'unknownEvent',
}

// 证书信息类型
export enum CertKinds {
  version = 1, // 证书版本 返回 V1 V2 V3
  serial = 2,  // 证书序列号
  sign_method = 3, // 证书类型 RSA/SM2
  issuer_c = 4,  // 证书发放者国家名 多个之间用&&&隔开
  issuer_o = 5, // 证书发放者组织名
  issuer_ou = 6, // 证书发放者部门名
  issuer_st = 7, // 证书发放者省州名
  issuer_cn = 8, // 证书发放者通用名
  issuer_l = 9, // 证书发放者城市名
  issuer_e = 10, // 证书发放者 EMAIL 地址
  not_before = 11, // 证书 有 效期 起始 格式 YYYYMMDDHHMMSS
  not_after = 12, // 证书 有 效期 截止 格式 YYYYMMDDHHMMSS
  subject_c = 13, // 用户国家名
  subject_o = 14, // 用户组织名
  subject_ou = 15, // 用户部门名
  subject_st = 16, // 用户省州名
  subject_cn = 17, // 用户通用名
  subject_l = 18, // 用户城市名
  subject_e = 19, // 用户 EMAIL 地址
  pubkey = 20, // 证书公钥
  subject_dn = 33, // 用户 DN
  issuer_dn = 34, // 颁发者 DN
  uniqueid = 35, // 唯一实体 ID
}

export interface CertInfo {
  version: string // 证书版本 返回 V1 V2 V3
  serial: string  // 证书序列号
  sign_method: string // 证书类型 RSA/SM2
  issuer_c: string  // 证书发放者国家名 多个之间用&&&隔开
  issuer_o: string  // 证书发放者组织名
  issuer_ou: string  // 证书发放者部门名
  issuer_st: string  // 证书发放者省州名
  issuer_cn: string  // 证书发放者通用名
  issuer_l: string  // 证书发放者城市名
  issuer_e: string  // 证书发放者 EMAIL 地址
  not_before: string  // 证书 有 效期 起始 格式 YYYYMMDDHHMMSS
  not_after: string  // 证书 有 效期 截止 格式 YYYYMMDDHHMMSS
  subject_c: string  // 用户国家名
  subject_o: string  // 用户组织名
  subject_ou: string  // 用户部门名
  subject_st: string  // 用户省州名
  subject_cn: string  // 用户通用名
  subject_l: string  // 用户城市名
  subject_e: string  // 用户 EMAIL 地址
  pubkey: string  // 证书公钥
  subject_dn: string  // 用户 DN
  issuer_dn: string  // 颁发者 DN
  uniqueid: string  // 唯一实体 ID
  [prop: string]: string
}
