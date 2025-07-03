import Result from 'antd/es/result';
import Button from 'antd/es/button';
import { ROUTE } from '../../Constants/routes.constants';

export default function UnderMaintainance() {
  return (
    <>
      <Result
        status="500"
        title="Under Maintenance"
        subTitle="Sorry, this page is currently under maintenance. Please check back later."
        extra={
          <Button type="primary" href={ROUTE.HOME}>
            Back Home
          </Button>
        }
      />
    </>
  );
}
