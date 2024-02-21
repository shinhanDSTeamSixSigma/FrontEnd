import { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { FarmPay } from '../../../components/farm/FarmPay';
import StyledBody from '../../../components/StyledBody';

export default function FarmPayPage() {
    return (
        <>
            <StyledBody>
                <FarmPay />
            </StyledBody>
        </>
    );
}
