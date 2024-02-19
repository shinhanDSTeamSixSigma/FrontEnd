import { Link } from 'react-router-dom';
import FarmTypeAlignList from '../../../components/farm/FarmTypeAlign';

const farms = [
    {
        farm_no: 1,
        farm_name: '토심이네',
        farm_rating: 5.0,
        image: 'https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        farm_career: 20,
        farm_address: '서울시 어디',
        farm_content: '배고픈 농장',
        farm_description: '우주대전문가',
        farm_phone: '010-1111-1111',
        farm_orderNum: 23,
    },
    {
        farm_no: 2,
        farm_name: '토뭉이네',
        farm_rating: 4.5,
        image: 'https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        farm_career: 10,
        farm_address: '수원시',
        farm_content: '배고픈 농장',
        farm_description: '우주대전문가',
        farm_phone: '010-1111-1111',
        farm_orderNum: 18,
    },
    {
        farm_no: 3,
        farm_name: '쪼시미네',
        farm_rating: 3.2,
        image: 'https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        farm_career: 3,
        farm_address: '강릉',
        farm_content: '배고픈 농장',
        farm_description: '우주대전문가',
        farm_phone: '010-1111-1111',
        farm_orderNum: 11,
    },
    {
        farm_no: 4,
        farm_name: '고심이네',
        farm_rating: 2.1,
        image: 'https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        farm_career: 10,
        farm_address: '서울시 어디',
        farm_content: '배고픈 농장',
        farm_description: '우주대전문가',
        farm_phone: '010-1111-1111',
        farm_orderNum: 10,
    },
];
function whenFarmListClicked(farmNo) {}
function FarmObject(props) {
    return (
        <Link to={'/farm-detail'} key={props.farm.farm_no}>
            <div className="d-flex shadow border rounded">
                <div className="ml-3">
                    <div>
                        <h2 className="text-xl font-bold text-gray-900">
                            {props.farm.farm_name}
                        </h2>
                    </div>
                    <div className="d-flex bd-highlight mt-1">
                        {/*<p className="text-sm text-gray-500">
                        {props.farm.farm_rating}
    </p>*/}
                        <p className="text-lg">⭐</p>
                        <p className="mt-1 font-bold">
                            {props.farm.farm_rating}
                        </p>{' '}
                        <p className="mt-2 ml-1 text-sm">
                            ({props.farm.farm_orderNum})
                        </p>
                        <p className="ml-2 mr-2 mt-1 text-sm">|</p>
                        <p className="mt-1 text-sm">
                            경력 {props.farm.farm_career}년
                        </p>
                        <p className="ml-2 mr-2 mt-1 text-sm">|</p>
                        <p className="mt-1 text-sm">
                            {props.farm.farm_address}
                        </p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-500 mt-3">
                            {props.farm.farm_content}
                        </p>
                    </div>
                </div>
                <img
                    className="w-25 h-25 rounded flex-shrink-1 bd-highlight ms-auto shadows mt-2 mb-2 mr-2 ml-2"
                    src={props.farm.image}
                    alt=""
                />
            </div>
        </Link>
    );
}

export default function FarmPage() {
    return (
        <>
            {/* 카테고리별 가로 정렬 */}
            <FarmTypeAlignList></FarmTypeAlignList>
            {/* ㅁㅁ순 정렬*/}

            {/* 리스트 */}
            <ul className="">
                {farms.map((farm) => (
                    <li key={farm.farm_no} className="py-4 w-100% ml-5 mr-5">
                        <FarmObject farm={farm} />
                    </li>
                ))}
            </ul>
        </>
    );
}
