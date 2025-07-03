import Spin from 'antd/es/spin';
import { LoadingOutlined } from '@ant-design/icons';

export default function Loader() {
  return (
    <Spin
      fullscreen
      indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />}
    />
  );
}
