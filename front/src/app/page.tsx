import Button from '../components/Button/Button';
import Card from '../components/Card/Card';
import Input from '../components/Input/Input';

export default async function Home() {
  return (
    <div className="flex items-center justify-center h-screen">
      <Card className='p-8 flex flex-col gap-4 items-center'>
        <h1 className='text-2xl font-bold'>IWF Hubbe App</h1>

        <form className='flex flex-col gap-2'>
          <Input label="Username" />
          <Button className='w-full'>Login</Button>
        </form>
      </Card>
    </div>
  );
}
