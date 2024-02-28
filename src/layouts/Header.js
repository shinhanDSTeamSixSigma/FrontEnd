import { Fragment } from 'react';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/header.css';
import { useState } from 'react';
import { getMemberNo } from '../api/farmApi';
import Search from '../components/Search';
import ReactDOM from 'react-dom';

const user = {
    name: '문의 이메일',
    email: 'greenwave@google.com',
    imageUrl:
        'https://ilovecharacter.com/news/data/20230731/p1065542571400847_461_thum.jpg',
};

function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
}

export default function Header({ handleModalToggle }) {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [memberData, setMemberData] = useState(null); // 농부의 memberNo

    useEffect(() => {
        // 서버에서 사용자 정보 가져오기
        getMemberNo()
            .then((res) => {
                setMemberData(res.memberNo);
                console.log(res);
            })
            .catch((error) => {
                console.log('데이터 안옴!!!!!!');
                console.error(error);
            });
    }, [memberData]);

    const navigation = [
        { name: '메인', href: '/', current: selectedIndex === 0 },
        {
            name: '농장찾기',
            href: '/farm/list?page=1&size=10',
            current: selectedIndex === 1,
        },
        {
            name: '작물정보',
            href: '/crop-list',
            current: selectedIndex === 2,
        },
    ];
    const userNavigation = memberData
        ? [
              {
                  name: '마이페이지',
                  href: '/mypage',
                  current: selectedIndex === 3,
              },
              //   { name: '로그아웃', href: '/?login=0' }, // 로그아웃 상태에서는 로그아웃 링크를 표시
          ]
        : [
              { name: '로그인', href: '/login', current: selectedIndex === 3 }, // 로그아웃 상태에서는 로그인 링크를 표시
          ];

    const handleItemClick = (index) => {
        setSelectedIndex(index); // 항목을 클릭하면 해당 인덱스를 선택된 인덱스로 업데이트
    };

    const handleMobileItemClick = (index) => {
        setSelectedIndex(index);
        handleModalToggle(); // 모바일에서 항목을 클릭하면 네비게이션 바 닫기
    };

    return (
        <>
            <div className="min-h-full">
                <Disclosure as="nav" className="bg-white">
                    {({ open }) => (
                        <>
                            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                                <div className="flex h-16 items-center justify-between">
                                    <div className="flex items-center">
                                        <div className="flex-shrink-0">
                                            <Link to={'/'}>
                                                <button>
                                                    <img
                                                        className="h-12 w-15"
                                                        src="/img/greenwave_logo.png"
                                                        alt="Your Company"
                                                    />
                                                </button>
                                            </Link>
                                        </div>
                                        {/* 데스크탑 네브바 */}
                                        <div className="hidden md:block">
                                            <div className="ml-10 flex items-baseline space-x-4">
                                                {navigation.map(
                                                    (item, index) => (
                                                        <Link
                                                            to={item.href}
                                                            key={
                                                                'namer' + index
                                                            } /*이거 이름 중복돼서 수정! */
                                                            onClick={() =>
                                                                handleItemClick(
                                                                    index,
                                                                )
                                                            } // 항목을 클릭하면 해당 인덱스로 업데이트하는 함수 호출
                                                            className={classNames(
                                                                item.current
                                                                    ? 'bg-[#80BCBD] text-white'
                                                                    : 'text-gray-700 hover:bg-[#80BCBD] hover:text-white',
                                                                'rounded-md px-3 py-2 text-sm font-medium',
                                                            )}
                                                            aria-current={
                                                                item.current
                                                                    ? 'page'
                                                                    : undefined
                                                            }
                                                        >
                                                            {item.name}
                                                        </Link>
                                                    ),
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    {/* 데스크탑 검색 */}
                                    <div className="hidden md:block">
                                        <div className="ml-4 flex items-center md:ml-6">
                                            <div className="searchIcon">
                                                <button
                                                    onClick={handleModalToggle}
                                                >
                                                    <img
                                                        src={
                                                            process.env
                                                                .PUBLIC_URL +
                                                            `/img/Search.png`
                                                        }
                                                        alt=""
                                                    />
                                                </button>
                                            </div>

                                            {/* 데스크탑 회원 네브바 */}
                                            <Menu
                                                as="div"
                                                className="relative ml-3"
                                            >
                                                <div>
                                                    <Menu.Button className="relative flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                                        <span className="absolute -inset-1.5" />
                                                        <span className="sr-only">
                                                            Open user menu
                                                        </span>
                                                        <img
                                                            className="h-8 w-8 rounded-full"
                                                            src={user.imageUrl}
                                                            alt=""
                                                        />
                                                    </Menu.Button>
                                                </div>
                                                <Transition
                                                    as={Fragment}
                                                    enter="transition ease-out duration-100"
                                                    enterFrom="transform opacity-0 scale-95"
                                                    enterTo="transform opacity-100 scale-100"
                                                    leave="transition ease-in duration-75"
                                                    leaveFrom="transform opacity-100 scale-100"
                                                    leaveTo="transform opacity-0 scale-95"
                                                >
                                                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                        {userNavigation.map(
                                                            (item, index) => (
                                                                <Menu.Item
                                                                    key={
                                                                        item.name
                                                                    }
                                                                >
                                                                    {({
                                                                        active,
                                                                    }) => (
                                                                        <Link
                                                                            to={
                                                                                item.href
                                                                            }
                                                                            key={
                                                                                item.name
                                                                            }
                                                                            className={classNames(
                                                                                active
                                                                                    ? 'bg-gray-100'
                                                                                    : '',
                                                                                'block px-4 py-2 text-sm text-gray-700',
                                                                            )}
                                                                            aria-current={
                                                                                item.current
                                                                                    ? 'page'
                                                                                    : undefined
                                                                            }
                                                                        >
                                                                            {
                                                                                item.name
                                                                            }
                                                                        </Link>
                                                                    )}
                                                                </Menu.Item>
                                                            ),
                                                        )}
                                                    </Menu.Items>
                                                </Transition>
                                            </Menu>
                                        </div>
                                    </div>
                                    <div className="-mr-2 flex md:hidden">
                                        <div className="searchIcon">
                                            <button onClick={handleModalToggle}>
                                                <img
                                                    src={
                                                        process.env.PUBLIC_URL +
                                                        `/img/Search.png`
                                                    }
                                                    alt=""
                                                />
                                            </button>
                                        </div>
                                        {/* 모바일 네브 버튼 */}
                                        <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                            <span className="absolute -inset-0.5" />
                                            <span className="sr-only">
                                                Open main menu
                                            </span>
                                            {open ? (
                                                <XMarkIcon
                                                    className="block h-6 w-6"
                                                    aria-hidden="true"
                                                />
                                            ) : (
                                                <Bars3Icon
                                                    className="block h-6 w-6"
                                                    aria-hidden="true"
                                                />
                                            )}
                                        </Disclosure.Button>
                                    </div>
                                </div>
                            </div>
                            {/* 모바일 네브바 */}
                            <Disclosure.Panel className="md:hidden">
                                <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
                                    {navigation.map((item, index) => (
                                        <>
                                            <Link
                                                to={item.href}
                                                key={'asdf' + index}
                                                onClick={() =>
                                                    handleItemClick(index)
                                                } // 항목을 클릭하면 해당 인덱스로 업데이트하는 함수 호출
                                                className={classNames(
                                                    item.current
                                                        ? 'bg-gray-700 text-white'
                                                        : 'text-black hover:bg-gray-700 hover:text-white',
                                                    'block rounded-md px-3 py-2 text-base font-medium',
                                                )}
                                                aria-current={
                                                    item.current
                                                        ? 'page'
                                                        : undefined
                                                }
                                            >
                                                {item.name}
                                            </Link>
                                        </>
                                    ))}
                                </div>
                                {/* 모바일 프로필 네브바 */}
                                <div className="border-t border-gray-700 pb-3 pt-4">
                                    <div className="flex items-center px-5">
                                        <div className="flex-shrink-0">
                                            <img
                                                className="h-10 w-10 rounded-full"
                                                src={user.imageUrl}
                                                alt=""
                                            />
                                        </div>
                                        <div className="ml-3">
                                            <div className="text-base font-medium leading-none text-white">
                                                {user.name}
                                            </div>
                                            <div className="text-sm font-medium leading-none text-gray-400">
                                                {user.email}
                                            </div>
                                        </div>
                                        <button
                                            type="button"
                                            className="relative ml-auto flex-shrink-0 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                                        >
                                            <span className="absolute -inset-1.5" />
                                            <span className="sr-only">
                                                View notifications
                                            </span>
                                            <BellIcon
                                                className="h-6 w-6"
                                                aria-hidden="true"
                                            />
                                        </button>
                                    </div>
                                    <div className="mt-3 space-y-1 px-2">
                                        {userNavigation.map((item, index) => (
                                            <>
                                                <Link
                                                    to={item.href}
                                                    key={item.name}
                                                    onClick={() =>
                                                        handleItemClick(
                                                            index + 3,
                                                        )
                                                    } // 항목을 클릭하면 해당 인덱스로 업데이트하는 함수 호출
                                                    className="block rounded-md px-3 py-2 text-base font-medium text-black hover:bg-gray-700 hover:text-white"
                                                    aria-current={
                                                        item.current
                                                            ? 'page'
                                                            : undefined
                                                    }
                                                >
                                                    {item.name}
                                                </Link>
                                            </>
                                        ))}
                                    </div>
                                </div>
                            </Disclosure.Panel>
                        </>
                    )}
                </Disclosure>
            </div>
        </>
    );
}
