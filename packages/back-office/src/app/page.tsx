import { Button } from '~/components/ui/button';
import { ProfileForm } from '~/components/form-example';

export default function Page() {
  return (
    <div className='pt-32 space-y-7'>
      <Button>button</Button>
      <ProfileForm></ProfileForm>
    </div>
  );
}
