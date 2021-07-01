import styled from 'styled-components';
import { device } from '@/pages/main/styles';
import { LabelDescription, LabelTitle } from '@/components/label';

export const LabelTitleCentered = styled(LabelTitle)`
    text-align: center;
`
export const LabelDescriptionCentered = styled(LabelDescription)`
    text-align: center;
`

export const LabelDescBoxCentered = styled(LabelDescription)`
    text-align: center;
    padding: 16px;
    background: #FFFFFF;
    box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.2);
    border-radius: 3px;
`