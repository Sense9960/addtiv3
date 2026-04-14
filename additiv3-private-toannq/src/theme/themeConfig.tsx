import type { ThemeConfig } from 'antd';

const theme: ThemeConfig = {
    token: {
        fontSize: 16,
        colorPrimary: '#000000',
        colorTextBase: '#111111',
        fontFamily: 'var(--font-svn-gilroy)',
        borderRadius: 8,
        screenMD: 744,
        screenMDMin: 744,
        screenSMMax: 743,
        screenXL: 1440,
        screenXLMin: 1440,
        screenLGMax: 1439,
    },
    components: {
        Button: {
            controlHeight: 44,
            paddingContentHorizontal: 24,
        },
        Typography: {
            fontFamilyCode: 'monospace',
        },
        Select: {
            colorPrimary: '#0014e6',
            colorPrimaryHover: '#0014e6',
        },
        Input: {
            colorPrimary: '#0014e6',
            activeBorderColor: '#0014e6',
            hoverBorderColor: '#0014e6',
        },
        InputNumber: {
            colorPrimary: '#0014e6',
            activeBorderColor: '#0014e6',
            hoverBorderColor: '#0014e6',
        },
        Checkbox: {
            colorPrimary: '#0014e6',
            colorPrimaryHover: '#0014e6',
        },
    }
};

export default theme;