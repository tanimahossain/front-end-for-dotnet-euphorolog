import Modal from 'react-modal';
import HashLoader from 'react-spinners/HashLoader';
import '../App.css';
function Loading({ loading }) {
    console.log('askdh');
    return (
        <Modal
            isOpen={loading}
            style={{
                overlay: {
                    position: 'absolute',
                    top: 40,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    height: '1800px',
                    alignItems: 'center',
                    alignContent: 'center',
                    marginLeft: 'auto',
                    marginReft: 'auto',
                    backgroundColor:
                        'rgba(255, 255, 255, 0.75)',
                },
                content: {
                    position: 'absolute',
                    top: '40px',
                    left: '40px',
                    right: '40px',
                    bottom: '40px',
                    height: '600px',
                    alignItems: 'center',
                    alignContent: 'center',
                    border: '1px solid #ccc',
                    background: '#fff',
                    overflow: 'auto',
                    WebkitOverflowScrolling: 'touch',
                    borderRadius: '4px',
                    outline: 'none',
                    padding: '20px',
                    justifyContent: 'center',
                },
            }}
        >
            <div className="Loading">
                <HashLoader
                    size={80}
                    color={'#14365d'}
                    loading={true}
                />
            </div>
        </Modal>
    );
}
export default Loading;
