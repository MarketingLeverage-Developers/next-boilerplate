export default async function SecurityWarning() {
    // 전체 화면을 감싸는 스타일
    const rootStyle: React.CSSProperties = {
        fontFamily: 'Arial, sans-serif',
        textAlign: 'center',
        backgroundColor: '#FFEDED',
        width: '100vw',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 0,
    };

    // 경고 박스 스타일
    const containerStyle: React.CSSProperties = {
        maxWidth: '600px',
        background: '#fff',
        padding: '30px',
        borderRadius: '10px',
        boxShadow: '0 6px 12px rgba(0, 0, 0, 0.2)',
        border: '3px solid #FF4D4D',
        animationName: 'shake',
        animationDuration: '0.5s',
        animationTimingFunction: 'ease-in-out',
    };

    const iconStyle: React.CSSProperties = {
        fontSize: '50px',
        color: '#D60000',
        marginBottom: '20px',
    };

    const titleStyle: React.CSSProperties = {
        color: '#D60000',
        fontSize: '24px',
        fontWeight: 'bold',
        margin: 0,
    };

    const textStyle: React.CSSProperties = {
        color: '#333',
        fontSize: '18px',
        lineHeight: 1.5,
        margin: '20px 0',
    };

    return (
        <>
            {/* 키프레임 정의를 위해 style 태그를 삽입 */}
            <style>{`@keyframes shake {
        0% { transform: translateX(0); }
        25% { transform: translateX(-5px); }
        50% { transform: translateX(5px); }
        75% { transform: translateX(-5px); }
        100% { transform: translateX(0); }
      }`}</style>

            <div style={rootStyle}>
                <div style={containerStyle}>
                    <div style={iconStyle}>&#9888;</div>
                    <h1 style={titleStyle}>보안경고: 비정상적인 접속이 감지되었습니다.</h1>
                    <p style={textStyle}>
                        안전한 서비스 제공을 위해
                        <br />
                        비정상적인 접속이 감지될 경우 이용이 제한될 수 있습니다.
                    </p>
                </div>
            </div>
        </>
    );
}
