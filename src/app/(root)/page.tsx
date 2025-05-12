import { getBannerList } from '@/services/banner';
import { getSpecialCarList } from '@/services/car';
import { getEventList } from '@/services/event';
import { getReviewList } from '@/services/reviews';
import ButtonA from '@/ui-kit/src/components/contents/Button/A/ButtonA';

export const dynamic = 'force-dynamic';

export default async function Root({}: // searchParams,

{}) {
    const { body: banners } = await getBannerList();
    const { body: cars } = await getSpecialCarList();
    const { body: reviews } = await getReviewList({ query: { page: '1', size: '10' } });
    const { body: events } = await getEventList({
        query: { page: '1', size: '2' },
    });

    console.log(banners, cars, reviews, events);

    return (
        <div>
            홈
            <ButtonA />
        </div>
    );
}
