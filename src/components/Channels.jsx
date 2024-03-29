import React from 'react';
import {
  Button, ButtonGroup, Nav, Col,
} from 'react-bootstrap';
import Dropdown from 'react-bootstrap/Dropdown';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { actions as channelsActions, selectors as channelsSelectors } from '../slices/channelsSlice.js';
import { actions as modalsActions } from '../slices/modalsSlice.js';

function Channels() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const channels = useSelector(channelsSelectors.selectAll);
  const currentChannelId = useSelector((state) => state.channels.currentChannelId);

  const selectChannel = (channelId) => () => {
    dispatch(channelsActions.setCurrentChannelId(channelId));
  };

  const showModal = (type, id = null) => () => {
    dispatch(modalsActions.showModal({ type, id }));
  };

  return (
    <Col xs={4} md={2} className="border-end pt-5 px-0 bg-light">
      <div className="d-flex justify-content-between mb-2 ps-4 pe-2">
        <span>{t('channels')}</span>
        <Button onClick={showModal('adding')} type="button" className="p-0 text-primary btn btn-group-vertical" variant="white">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor">
            <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
          </svg>
          <span className="visually-hidden">+</span>
        </Button>
      </div>
      <Nav
        as="ul"
        fill="true"
        className="px-2 flex-column"
        variant="pills"
      >
        {channels && channels.map((channel) => (
          <Nav.Item as="li" className="w-100" key={channel.id}>
            <Dropdown as={ButtonGroup} className="w-100 d-flex">
              <Button onClick={selectChannel(channel.id)} variant={channel.id === currentChannelId ? 'secondary' : 'light'} className="w-100 text-start text-truncate">
                <span className="me-1">#</span>
                {channel.name}
              </Button>
              {channel.removable && (
              <>
                <Dropdown.Toggle split variant={channel.id === currentChannelId ? 'secondary' : 'light'} id="dropdown-split-basic">
                  <span className="visually-hidden">Управление каналом</span>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item onClick={showModal('removing', channel.id)} as="button">{t('delete')}</Dropdown.Item>
                  <Dropdown.Item onClick={showModal('renaming', channel.id)} as="button">{t('rename')}</Dropdown.Item>
                </Dropdown.Menu>
              </>
              )}
            </Dropdown>
          </Nav.Item>
        ))}
      </Nav>
    </Col>
  );
}

export default Channels;
