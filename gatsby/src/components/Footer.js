import React from 'react';
import styled from 'styled-components';

const FooterStyles = styled.footer`
  text-align: center;
  margin-block-start: 6.4rem;
`;

export default function Footer() {
  return (
    <FooterStyles>
      <p>&copy; Slick's Slices {new Date().getFullYear()}</p>
    </FooterStyles>
  );
}
