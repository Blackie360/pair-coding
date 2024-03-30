import React, { ReactNode } from 'react'

interface MeetingModelProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  className?: string;
  children: ReactNode;
  handleClick: () => void;  
  buttonText?: string;
  image?: string;
  buttonIcon?: string;
}


const MeetingModel = ({ isOpen, onClose, title, className, 
  children, handleClick, buttonText, image, buttonIcon
}: MeetingModelProps) => {
  return (
    <div>MeetingModel</div>
  )
}

export default MeetingModel