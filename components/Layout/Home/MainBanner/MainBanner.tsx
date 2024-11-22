import { Level } from './Level'
import { BannerWrapper, ButtonWrapper } from './MainBanner.styles'
import { UserCharacter } from './UserCharacter'
import  LocationButton  from './../LocationButton/LocationButton'

export const MainBanner = () => {
    return (
        <BannerWrapper>
        <Level level={1} userName={'어데고'}/>
        <UserCharacter/>
        <ButtonWrapper>
            <LocationButton title='올린 장소' count={999}/>
            <LocationButton title='저장한 장소' count={999}/>
        </ButtonWrapper>
        </BannerWrapper>
    );
}