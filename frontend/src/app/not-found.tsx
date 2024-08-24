import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'
 
export default function NotFound() {
  return (
    <div className='h-screen flex justify-center items-center flex-col'>
      <Image src={'/not_found.svg'} alt='Not Found' width={500} height={500}></Image>
      <Button>
      <Link href="/">Return Home</Link>
      </Button>
    </div>
  )
}