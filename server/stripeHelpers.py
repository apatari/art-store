
def makeTextConfirmation(order):
    
    filename = order.customer_email + str(order.updated_on) 
    address=""
    if order.address2:
        address=f"""
    {order.address}
    {order.address2 or ""}
    {order.city + ", " + order.state + ", " + order.zip}"""
    else:
        address=f"""
    {order.address}
    {order.city + ", " + order.state + ", " + order.zip}"""

    with open(f'/Users/andypatari/Development/code/post-projects/art-store/server/confirmationsByText/{filename}', 'w') as file:
        file.write(f"""
Email: {order.customer_email}
Thank you for your purchase!
Total price: ${'{0:.2f}'.format(order.price_total/100)} 
Address:{address}
            
            """)