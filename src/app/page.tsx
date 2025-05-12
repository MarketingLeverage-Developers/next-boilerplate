import HomeApiCaller from '@/components/HomeApiCaller';
import Container from '@/wireframe/Container/Container';
import Content from '@/wireframe/Content/Content';
import DesktopContent from '@/wireframe/DesktopContent/DesktopContent';
import MobileContent from '@/wireframe/MobileContent/MobileContent';
import Page from '@/wireframe/Page/Page';
import Section from '@/wireframe/Section/Section';
import Text from '@/wireframe/Text/Text';
import { Suspense } from 'react';

export default function Home() {
    return (
        <Page>
            <Page.Header>헤더</Page.Header>
            <Page.Main>
                <Section backgroundImage="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFYqoKTu_o3Zns2yExbst2Co84Gpc2Q1RJbA&s">
                    <Container gap={40} paddingY={20}>
                        <Content>
                            <Text fontSize={46} fontWeight={100}>
                                업체개요
                            </Text>
                        </Content>
                        <Content gap={20}>
                            <div style={{ height: 250, width: '100%', background: 'blue' }}>카드</div>
                            <div style={{ height: 250, width: '100%', background: 'red' }}>카드</div>
                        </Content>
                        <DesktopContent gap={20}>
                            <div style={{ height: 250, width: '100%', background: 'blue' }}>데스크탑카드</div>
                            <div style={{ height: 250, width: '100%', background: 'red' }}>데스크탑카드</div>
                        </DesktopContent>
                        <MobileContent gap={20}>
                            <div style={{ height: 250, width: '100%', background: 'blue' }}>모바일카드</div>
                            <div style={{ height: 250, width: '100%', background: 'red' }}>모바일카드</div>
                        </MobileContent>
                    </Container>
                </Section>
            </Page.Main>
            <Page.Footer>
                푸터
                <Suspense fallback={<div></div>}>
                    <HomeApiCaller />
                </Suspense>
            </Page.Footer>
        </Page>
    );
}
