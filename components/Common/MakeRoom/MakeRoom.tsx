import Link from 'next/link';
import { MakeButton } from './MakeRoom.styles';

const MakeRoom = () => {
    return (
        <>
            <Link href='/makeRoom'>
                <MakeButton>방 만들기</MakeButton>  
            </Link>
        </>
    )
}
export default MakeRoom;