import os
import requests
import logging

logger = logging.getLogger(__name__)
logger.setLevel(logging.INFO)


def is_ec2_linux():
    """Detect if we are running on an EC2 Linux Instance
    See http://docs.aws.amazon.com/AWSEC2/latest/UserGuide/identify_ec2_instances.html
    """
    if os.path.isfile("/sys/hypervisor/uuid"):
        with open("/sys/hypervisor/uuid") as f:
            uuid = f.read()
            return uuid.startswith("ec2")
    return False


def get_linux_ec2_public_ip():
    """Get the public IP Address of the machine if running on an EC2 linux server"""
    if not is_ec2_linux():
        return None
    try:
        response = requests.get(
            url='http://169.254.169.254/latest/meta-data/public-ipv4'
        )
        return response.text
    except:
        return None


def get_linux_ec2_private_ip():
    """Get the private IP Address of the machine if running on an EC2 linux server"""
    if not is_ec2_linux():
        return None
    try:
        response = requests.get(
            url='http://169.254.169.254/latest/meta-data/local-ipv4'
        )
        return response.text
    except:
        return None


def appendAllowedHost(ALLOWED_HOSTS):
    ec2_info = 'is_ec2_linux: {}'.format(is_ec2_linux())
    logger.info(ec2_info)
    try:
        publicIP = get_linux_ec2_public_ip()
    except Exception as e:
        logger.error('exception: {}'.format(e))
    if publicIP != None:
        ALLOWED_HOSTS.append(publicIP)
        logger.info('publicIP: {} is appended to ALLOWED_HOSTS'.format(publicIP))
    # else:
    # logger.error('publicIP: {} is not appended to ALLOW_HOSTS'.format(publicIP))
    try:
        privateIP = get_linux_ec2_private_ip()
    except Exception as e:
        logger.error('exception: {}'.format(e))
    if privateIP != None:
        ALLOWED_HOSTS.append(privateIP)
        logger.info('privateIP: {} is appended to ALLOWED_HOSTS'.format(privateIP))
    # else:
    # logger.error('privateIP: {} is not appended to ALLOW_HOSTS'.format(privateIP))
    return ALLOWED_HOSTS
