import React, { useState } from 'react';
import AdminComment from './AdminComment';
import AdminQna from './AdminQna';
import EmailSender from './EmailSender';
import UserList from './UserList';
import WineInsert from './WineInsert';
import './Admin.css';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

function Admin(props) {
    const [expandedSection, setExpandedSection] = useState('');

    const toggleSection = (sectionName) => {
        setExpandedSection(prevSection => (prevSection === sectionName ? '' : sectionName));
    };

    return (
        <div className="admin-container">
            <SectionWrapper>
                <SectionHeader
                    label="문의 답변 관리"
                    sectionName="comment"
                    onClick={() => toggleSection('comment')}
                    isExpanded={expandedSection === 'comment'}
                />
                {expandedSection === 'comment' && <AdminQna />}
            </SectionWrapper>

            <SectionWrapper>
                <SectionHeader
                    label="이메일 전송"
                    sectionName="emailSender"
                    onClick={() => toggleSection('emailSender')}
                    isExpanded={expandedSection === 'emailSender'}
                />
                {expandedSection === 'emailSender' && <EmailSender />}
            </SectionWrapper>

            <SectionWrapper>
                <SectionHeader
                    label="유저 관리"
                    sectionName="userList"
                    onClick={() => toggleSection('userList')}
                    isExpanded={expandedSection === 'userList'}
                />
                {expandedSection === 'userList' && <UserList />}
            </SectionWrapper>

            <SectionWrapper>
                <SectionHeader
                    label="와인 등록"
                    sectionName="wineInsert"
                    onClick={() => toggleSection('wineInsert')}
                    isExpanded={expandedSection === 'wineInsert'}
                />
                {expandedSection === 'wineInsert' && <WineInsert />}
            </SectionWrapper>
        </div>
    );
}

const SectionWrapper = ({ children }) => {
    return <div className="section-wrapper">{children}</div>;
};

const SectionHeader = ({ label, sectionName, onClick, isExpanded }) => {
    return (
        <div className={`section-header ${isExpanded ? 'expanded' : ''}`} onClick={onClick}>
            <p className="text-center fancy-font">
                {label}
            </p>
            {isExpanded ? <FaChevronUp /> : <FaChevronDown />}
        </div>
    );
};

export default Admin;
