import Result from 'antd/es/result';
import Button from 'antd/es/button';
import { useNavigate } from 'react-router';

export default function UnderMaintainance() {
  const navigate = useNavigate();
  return (
    <>
      <Result
        status="500"
        title="Under Maintenance"
        subTitle="Sorry, this page is currently under maintenance. Please check back later."
        extra={
          <Button type="primary" onClick={() => navigate(-1)}>
            Go Back
          </Button>
        }
      />
    </>
  );
}
