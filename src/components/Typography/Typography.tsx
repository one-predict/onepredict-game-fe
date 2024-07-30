import React from 'react';
import styled from 'styled-components';

export interface TypographyProps {
  className?: string;
  alignment?: 'left' | 'center' | 'right';
  variant?:
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'h5'
    | 'h6'
    | 'subtitle1'
    | 'subtitle2'
    | 'body1'
    | 'body2';
  children?: React.ReactNode;
}

const VARIANTS_MAP = {
  h1: styled.h1<{ $alignment: TypographyProps['alignment'] }>`
    font-size: 1.5rem;
    line-height: 1.875rem;
    font-weight: 700;
    color: ${({ theme }) => theme.palette.white};
    text-align: ${({ $alignment }) => $alignment};
    
    @media (${({ theme }) => theme.devices.tablet}) {
      font-size: 1.625rem;
      letter-spacing: -0.03125rem;
    }

    @media (${({ theme }) => theme.devices.desktop}) {
      font-size: 2rem;
      letter-spacing: -0.0625rem;
    }
  `,
  h2: styled.h2<{ $alignment: TypographyProps['alignment'] }>`
    font-size: 1.25rem;
    line-height: 1.3;
    font-weight: 700;
    color: ${({ theme }) => theme.palette.white};
    text-align: ${({ $alignment }) => $alignment};

    @media (${({ theme }) => theme.devices.tablet}) {
      font-size: 1.375rem;
      letter-spacing: -0.03125rem;
    }

    @media (${({ theme }) => theme.devices.desktop}) {
      font-size: 1.75rem;
      letter-spacing: -0.046875rem;
    }
  `,
  h3: styled.h3<{ $alignment: TypographyProps['alignment'] }>`
    font-size: 1.125rem;
    line-height: 1.3;
    font-weight: 700;
    color: ${({ theme }) => theme.palette.white};
    text-align: ${({ $alignment }) => $alignment};

    @media (${({ theme }) => theme.devices.tablet}) {
      font-size: 1.25rem;
      letter-spacing: -0.03125rem;
    }

    @media (${({ theme }) => theme.devices.desktop}) {
      font-size: 1.5rem;
    }
  `,
  h4: styled.h4<{ $alignment: TypographyProps['alignment'] }>`
    font-size: 1rem;
    line-height: 1.3;
    font-weight: 700;
    color: ${({ theme }) => theme.palette.white};
    text-align: ${({ $alignment }) => $alignment};

    @media (${({ theme }) => theme.devices.tablet}) {
      font-size: 1.125rem;
      letter-spacing: -0.03125rem;
    }

    @media (${({ theme }) => theme.devices.desktop}) {
      font-size: 1.25rem;
    }
  `,
  h5: styled.h5<{ $alignment: TypographyProps['alignment'] }>`
    font-size: 0.875rem;
    line-height: 1.4;
    font-weight: 700;
    color: ${({ theme }) => theme.palette.white};
    text-align: ${({ $alignment }) => $alignment};

    @media (${({ theme }) => theme.devices.tablet}) {
      font-size: 1rem;
      letter-spacing: -0.03125rem;
    }

    @media (${({ theme }) => theme.devices.desktop}) {
      font-size: 1.125rem;
      letter-spacing: normal;
    }
  `,
  h6: styled.h6<{ $alignment: TypographyProps['alignment'] }>`
    font-size: 0.75rem;
    line-height: 1.4;
    font-weight: 700;
    color: ${({ theme }) => theme.palette.white};
    text-align: ${({ $alignment }) => $alignment};

    @media (${({ theme }) => theme.devices.tablet}) {
      font-size: 0.875rem;
      letter-spacing: -0.015625rem;
    }

    @media (${({ theme }) => theme.devices.desktop}) {
      font-size: 1rem;
      letter-spacing: normal;
    }
  `,
  subtitle1: styled.p<{ $alignment: TypographyProps['alignment'] }>`
    font-size: 1rem;
    line-height: 1.4;
    font-weight: 500;
    color: ${({ theme }) => theme.palette.white};
    text-align: ${({ $alignment }) => $alignment};

    @media (${({ theme }) => theme.devices.tablet}) {
      font-size: 1.125rem;
      letter-spacing: -0.015625rem;
    }

    @media (${({ theme }) => theme.devices.desktop}) {
      letter-spacing: 0.00625rem;
    }
  `,
  subtitle2: styled.p<{ $alignment: TypographyProps['alignment'] }>`
    font-size: 0.75rem;
    line-height: 1.4;
    font-weight: 400;
    color: ${({ theme }) => theme.palette.white};
    text-align: ${({ $alignment }) => $alignment};

    @media (${({ theme }) => theme.devices.tablet}) {
      font-size: 1rem;
      letter-spacing: -0.015625rem;
    }

    @media (${({ theme }) => theme.devices.desktop}) {
      letter-spacing: 0.00625rem;
    }
  `,
  body1: styled.p<{ $alignment: TypographyProps['alignment'] }>`
    font-size: 1rem;
    line-height: 1.5;
    font-weight: 400;
    color: ${({ theme }) => theme.palette.white};
    text-align: ${({ $alignment }) => $alignment};

    @media (${({ theme }) => theme.devices.tablet}) {
      font-size: 1.125rem;
      letter-spacing: -0.015625rem;
    }

    @media (${({ theme }) => theme.devices.desktop}) {
      letter-spacing: normal;
    }
  `,
  body2: styled.p<{ $alignment: TypographyProps['alignment'] }>`
    font-size: 0.875rem;
    line-height: 1.5;
    font-weight: 400;
    color: ${({ theme }) => theme.palette.white};
    text-align: ${({ $alignment }) => $alignment};

    @media (${({ theme }) => theme.devices.tablet}) {
      font-size: 1rem;
      letter-spacing: -0.015625rem;
    }

    @media (${({ theme }) => theme.devices.desktop}) {
      letter-spacing: normal;
    }
  `,
};

const Typography = ({
  variant = 'body1',
  alignment = 'left',
  children,
  ...restProps
}: TypographyProps) => {
  const Component = VARIANTS_MAP[variant];

  return <Component $alignment={alignment} {...restProps}>{children}</Component>;
};

export default Typography;
