import boto3
def getSession():
    session = boto3.Session(
        aws_access_key_id = "ASIASLYVERDYZMETKN3B",
        aws_secret_access_key = "IhEw63oY86W5vZgJXFhp3H3jbcP2j79/9GKByvsY",
        aws_session_token = "FwoGZXIvYXdzEGoaDILlNW+G3lUNipDURiLAAaCCz3Gntx1GknirLf//dBnoH1rGZfoZey/+exvnvucfaRPxthLYpdtA8ecRJwvDJ4EF8W0s2y/vjfxR6iEmUMpm4kO3bN8fXPyfUE05J6T8nJFFrBheXUlw2e/rtnyAhP9kwZwx75Q0VLd3AvDdMQpOYKdvggwLTkTI/XHzHTn4MMGExYpiMzFmLKjq+cw8ciZDRycuvCXC2Jc9xmou+9HfFdPF0LvgaIL2mVcHU1PLAvJoIHavIiJ3Il7I2cK/4iiUtN6fBjItMs8UaiRN8VXB7QEDdlrE27WYVwVUKZokZ9YHjEQh304dFlLaPyZEzk2E242b",
        region_name = 'us-east-1'
        )
    return session