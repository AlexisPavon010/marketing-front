import { Result } from "antd"

export const ErrorComponent = () => {
  return (
    <Result
      status="info"
      title="El servicio se encuentra inhabilitado temporalmente."
      subTitle="Por favor, intente nuevamente más tarde o contacte al administrador del sitio si el problema persiste."
    />
  )
}
