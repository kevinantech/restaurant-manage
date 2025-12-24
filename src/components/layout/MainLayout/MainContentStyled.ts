import styled from '@emotion/styled';

type MainContentStyledProps = {
  expanded?: boolean;
};

const MainContentStyled = styled('main', {
  shouldForwardProp: (prop) => prop !== 'expanded', // prevent 'expanded' from being passed to the DOM
})<MainContentStyledProps>({
  marginTop: 'var(--header-height)',
});

export default MainContentStyled;
