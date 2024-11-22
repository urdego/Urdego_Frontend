import { Level } from './Level'
import { BannerWrapper } from './MainBanner.styles'
import { UserCharacter } from './UserCharacter'

export const MainBanner = () => {
    return (
        <BannerWrapper>
        <Level level={1} userName={'어데고'}/>
        <UserCharacter/>
        </BannerWrapper>
    );
}