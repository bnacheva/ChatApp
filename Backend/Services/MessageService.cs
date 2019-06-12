using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using WebApi.Entities;
using WebApi.Helpers;
using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace WebApi.Services
{
    public class MessageService : IMessageService
    {
        private readonly DataContext _context;

        public MessageService(DataContext context)
        {
            _context = context;
        }

        public async Task<List<Message>> GetMessagesAsync()
        {
            var messages = await _context.Messages.ToListAsync<Message>();

            return messages;
        }

        public async Task<List<Message>> GetMessagesForChatRoomAsync(Guid roomId)
        {
            var messagesForRoom = await _context.Messages
                                      .Where(m => m.RoomId == roomId)
                                               .ToListAsync<Message>();

            return messagesForRoom;
        }

        public async Task<bool> AddMessageToRoomAsync(Guid roomId, Message message)
        {
            message.Id = Guid.NewGuid();
            message.RoomId = roomId;
            message.PostedAt = DateTimeOffset.Now;

            _context.Messages.Add(message);

            var saveResults = await _context.SaveChangesAsync();

            return saveResults > 0;
        }
    }
}