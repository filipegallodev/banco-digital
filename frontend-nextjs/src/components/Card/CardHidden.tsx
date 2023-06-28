import React from "react";
import ChipImg from "@/../public/chip.png";
import VisibilityOffRoundedIcon from "@mui/icons-material/VisibilityOffRounded";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { toggleCardHidden } from "@/store/reducers/card";
import * as Styled from "./Card.styled";

interface IProps {
  type: string;
  number: string;
  owner: string;
  hidden: boolean;
}

const CardHidden = ({ type, number, owner, hidden }: IProps) => {
  const dispatch = useAppDispatch();

  return (
    <Styled.CardContainer>
      <Styled.NameBox>
        <Styled.CardName>
          Next <span className={type}>{type}</span>
        </Styled.CardName>
        <VisibilityOffRoundedIcon
          onClick={() => dispatch(toggleCardHidden({ type, hidden: !hidden }))}
        />
      </Styled.NameBox>
      <Styled.ImageAndCvvBox>
        <Styled.ImageStyled
          src={ChipImg}
          width={72}
          height={72}
          alt="Chip do Cartão"
        />
        <Styled.CardCvv>Cvv ***</Styled.CardCvv>
      </Styled.ImageAndCvvBox>
      <Styled.CardNumber>
        {"**** **** **** " + number.slice(-4)}
      </Styled.CardNumber>
      <Styled.Box>
        <Styled.CardOwner>{owner}</Styled.CardOwner>
        <Styled.CardDate>**/**</Styled.CardDate>
      </Styled.Box>
    </Styled.CardContainer>
  );
};

export default CardHidden;
