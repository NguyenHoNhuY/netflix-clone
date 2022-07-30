import useAuth from '@/hooks/useAuth';
import { CheckIcon } from '@heroicons/react/outline';
import Link from 'next/link';

export interface PlansProps {}

export default function Plans(props: PlansProps) {
    const { logout } = useAuth();

    return (
        <div>
            <head>
                <title>Netflix</title>
                <link rel='icon' href='../public/favicon.ico' />
            </head>

            <header className='border-b border-white/10 bg-[#141414]'>
                <Link href='/'>
                    <img
                        src='https://rb.gy/ulxxee'
                        alt='Netflix'
                        width={150}
                        height={90}
                        className='cursor-pointer object-contain'
                    />
                </Link>
                <button className='text-lg font-medium hover:underline' onClick={logout}>
                    Sign Out
                </button>
            </header>

            <main className='px5 max-w-5xl pt-28 pb-12 transition-all'>
                <h1 className='mb-3 text-3xl font-medium'>
                    Choose the plan that's right for you
                </h1>
                <ul>
                    <li className='flex items-center gap-x-2 text-lg'>
                        <CheckIcon className='h-7 w-7 text-[#E50914]' />
                        Watch all you want. Ad-free.
                    </li>
                    <li className='flex items-center gap-x-2 text-lg'>
                        <CheckIcon className='h-7 w-7 text-[#E50914]' />
                        Recommendation just for you.
                    </li>
                    <li className='flex items-center gap-x-2 text-lg'>
                        <CheckIcon className='h-7 w-7 text-[#E50914]' />
                        Change or cancel your plan anytime.
                    </li>
                </ul>

                <div className='mt-4 flex flex-col space-y-4'>
                    <div className='flex w-full items-center justify-center self-end md:w-3/5'>
                        <div className='planBox'>Standard</div>
                        <div className='planBox'>Standard</div>
                        <div className='planBox'>Standard</div>
                    </div>
                </div>
            </main>
        </div>
    );
}
